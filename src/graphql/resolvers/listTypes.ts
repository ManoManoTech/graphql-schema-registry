import {
	TypeCount,
	TypeTransactionalRepository,
} from '../../database/schemaBreakdown/type';
import {
	OperationCount,
	OperationTransactionalRepository,
} from '../../database/schemaBreakdown/operations';

interface ListedTypes {
	operations: OperationCount[];
	entities: TypeCount[];
}

export default async function listTypes(): Promise<ListedTypes> {
	return {
		operations:
			await OperationTransactionalRepository.getInstance().countOperationsByType(),
		entities:
			await TypeTransactionalRepository.getInstance().countTypesByType(),
	};
}
