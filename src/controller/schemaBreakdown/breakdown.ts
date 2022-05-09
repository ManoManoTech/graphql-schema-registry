import {DocumentNode, parse} from "graphql";
import {DocumentNodeType, EntityType, FieldProperty} from "../../model/enums";
import {Type, TypePayload} from "../../model/type";
import {TypeTransactionalRepository} from "../../database/schemaBreakdown/type";
import Knex from "knex";
import {Field, FieldPayload} from "../../model/field";
import {FieldTransactionRepository} from "../../database/schemaBreakdown/field";
import {Implementation} from "../../model/implementation";
import {ImplementationTransactionRepository} from "../../database/schemaBreakdown/implementation";

type DocumentMap = Map<string, any[]>
type EnumPayload = {
	enum: TypePayload,
	values: string[]
}[];
type InterfacePayload = {
	interface: TypePayload,
	implementations: TypePayload[];
}

export class BreakDownSchemaCaseUse {
	private typeRepository;
	private fieldRepository;
	private implementationRepository;
	private dbMap: Map<string, number>; // Map -> name: id

	constructor(
		private trx: Knex.Transaction,
		private type_defs: string,
		private service_id: number
	) {
		this.typeRepository = new TypeTransactionalRepository(trx);
		this.fieldRepository = new FieldTransactionRepository(trx);
		this.implementationRepository = new ImplementationTransactionRepository(trx);
		this.dbMap = new Map<string, number>();
	}

	async breakDown(): Promise<void> {
		try {
			const schema = parse(this.type_defs);
			const mappedTypes = BreakDownSchemaCaseUse.mapTypes(schema);
			await this.computeScalars(mappedTypes);
			await this.computeEnums(mappedTypes);
			await this.computeDirectives(mappedTypes);
			await this.computeInterfaces(mappedTypes);
			// const interfaces = getInterfaces(mappedTypes);
			// const queries = getQueries(mappedTypes);
			return;
		} catch(err) {
			console.log('Error breaking down the schema', err)
			// TODO: Check error management
			throw Error()
		}
	}


	private static mapTypes(document: DocumentNode): DocumentMap {
		return document.definitions.reduce((acc, cur) => {
			const type = cur.kind;
			if (acc.has(type)) {
				acc.set(type, [...acc.get(type), cur])
			} else {
				acc.set(type, [cur])
			}
			return acc;
		}, new Map<string, any[]>())
	}

	private async computeScalars(mappedTypes: DocumentMap) {
		const scalars = this.getScalars(mappedTypes);
		await this.computeTypes(scalars)
	}

	private getScalars(mappedTypes: DocumentMap): Map<string, TypePayload> {
		const scalars = mappedTypes
			.get(DocumentNodeType.SCALAR)?.map((def: any) => {
				return {
					name: def.name.value,
					description: def.description,
					type: EntityType.SCALAR
				}
			}) ?? [];

		const objectScalars = mappedTypes.get(DocumentNodeType.OBJECT)?.reduce((acc, cur) =>
		{
			const fieldTypes = cur.fields
				.map(field =>  BreakDownSchemaCaseUse.getScalarsFromFields(field))
				.filter(Boolean);
			//TODO: What we have to handle ID type
			return [...acc, ...fieldTypes];
		}, [] as string[]) ?? [];

		if (mappedTypes.get(DocumentNodeType.ENUM)?.length > 0) {
			scalars.push({
				name: 'String',
				description: undefined,
				type: EntityType.SCALAR
			})
		}
		return [...scalars, ...objectScalars].reduce((acc, cur) => {
			const name = cur.name;
			if (!acc.has(name)) {
				acc.set(name, cur);
			}
			return acc;
		}, new Map<string, TypePayload>())
	}

	private async computeTypes(types: Map<string, TypePayload>) {
		if (types.size > 0) {
			await this.typeRepository.insertIgnoreTypes(Array.from(types.values()));
		}
		const names = Array.from(types.keys());
		const dbTypes: Type[] = await this.typeRepository.getTypesByNames(names)
		dbTypes.forEach(t => this.dbMap.set(t.name, t.id))
	}

	private async computeEnums(mappedTypes: DocumentMap) {
		const enums = this.getEnums(mappedTypes);
		const enumsDb = enums.reduce((acc, cur) => {
			// TODO: Extract on a helping function
			const name = cur.enum.name;
			if (!acc.has(name)) {
				acc.set(name, cur.enum);
			}
			return acc;
		}, new Map<string, TypePayload>())
		await this.computeTypes(enumsDb);
		const stringTypeId = this.dbMap.get('String');
		const fields = enums.map(e => {
			const parentId = this.dbMap.get(e.enum.name);
			return e.values.map(f => {
				return {
					name: f,
					is_nullable: true,
					is_array:false,
					is_array_nullable: false,
					is_deprecated: false,
					parent_type_id: parentId,
					children_type_id: stringTypeId
				} as FieldPayload
			})
		});
		const promises = fields.map(field => this.fieldRepository.insertIgnoreFields(field));
		await Promise.all(promises);
	}

	private getEnums(mappedTypes: DocumentMap): EnumPayload {
		return mappedTypes.get(DocumentNodeType.ENUM)?.reduce((acc, cur) =>
		{
			acc.push({
				enum: {
					name: cur.name.value,
					description: cur.name.description,
					type: EntityType.ENUM
				},
				values: cur.values.map(e => e.name.value)
			})
			return acc;
		}, [] as EnumPayload) ?? [];
	}

	private async computeDirectives(mappedTypes: DocumentMap) {
		const directives = this.getDirectives(mappedTypes);
		if (directives.size > 0) {
			await this.typeRepository.insertIgnoreTypes(Array.from(directives.values()));
		}
	}

	private getDirectives(mappedTypes: DocumentMap): Map<string, TypePayload> {
		return mappedTypes.get(DocumentNodeType.DIRECTIVE)?.reduce((acc, curr) => {
			const name = curr.name.value;
			if (!acc.has(name)) {
				acc.set(name, {
					name,
					description: curr.description,
					type: EntityType.DIRECTIVE
				});
			}
			return acc;
		}, new Map<string, TypePayload>());
	}

	private static getScalarsFromFields(field: any): TypePayload | null {
		//TODO: Watch out infinite loop
		while(field.type) {
			field = field.type;
		}
		const name = field.name.value;
		if (!["Int", "string", "Boolean", "ID"].includes(name)) {
			return null;
		}
		return {
			name,
			description: field.description,
			type: EntityType.SCALAR
		}

	}

	private async computeInterfaces(mappedTypes: DocumentMap) {
		const interfaces = this.getInterfaces(mappedTypes);
		const allTypes = interfaces.map(i => {
			return [...[i.interface], ...i.implementations]
		});
		const interfacesToInsert = [].concat(...allTypes) as TypePayload[];
		if (interfacesToInsert.length > 0) {
			await this.typeRepository.insertIgnoreTypes(interfacesToInsert);
		}
		const names = interfacesToInsert.map(i => i.name);
		const dbInterfaces = await this.typeRepository.getTypesByNames(names);
		dbInterfaces.forEach(t => this.dbMap.set(t.name, t.id));
		const implementations = interfaces.map(i => {
			return i.implementations.map(imp => {
				return {
					interface_id: this.dbMap.get(i.interface.name),
					implementation_id: this.dbMap.get(imp.name)
				} as Implementation
			});
		});
		const dbImplementations = [].concat(...implementations)
		if (dbImplementations.length > 0) {
			await this.implementationRepository.insertIgnoreImplementations(dbImplementations);
		}
	}

	private getInterfaces(mappedTypes: DocumentMap): InterfacePayload[] {
		return mappedTypes.get(DocumentNodeType.INTERFACE)?.reduce((acc, cur) =>
		{
			const int = {
				interface: {
					name: cur.name.value,
					description: cur.description,
					type: EntityType.INTERFACE
				},
				implementations: cur.values?.map(i => {
					return {
						name: i.name.value,
						description: i.name.description,
						type: EntityType.OBJECT
					}
				}) ?? []
			} as InterfacePayload;
			return [...acc, ...[int]]
		}, [] as InterfacePayload[]) ?? [];
	}

	private getQueries(mappedTypes: DocumentMap): any[] {
		return []
	}

	private async extractFieldFromObject(field: any, parentName: string): Promise<FieldPayload> {
		let name = field.name.value;
		let is_array = false;
		let is_nullable, is_array_nullable = true;
		while (field.type) {
			const nextType = field.type;
			if (field.kind === DocumentNodeType.FIELD && nextType?.kind === FieldProperty.NOT_NULL) {
				is_nullable = false;
			}
			if (field.kind === FieldProperty.IS_ARRAY) {
				is_array = true;
				if (nextType?.kind === FieldProperty.NOT_NULL) {
					is_array_nullable = true;
				}
			}
		}

		return {
			name,
			is_array,
			is_array_nullable,
			is_nullable,
			is_deprecated: false, // TODO: Check
			parent_type_id: this.dbMap.get(parentName),
			children_type_id: this.dbMap.get(field.name.value)
		}
	}
}

// TODO: After splitting
// export async privateinsertBreakDown(): any
