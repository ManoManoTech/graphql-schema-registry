import { EntityType, OperationType } from '../../model/enums';
import { TypeTransactionalRepository } from '../../database/schemaBreakdown/type';
import { OperationTransactionalRepository } from '../../database/schemaBreakdown/operations';
import { isEnum } from '../utils';
import { TypeInstanceRepository } from '../../model/repository';
import { GraphQLError } from 'graphql';

function a(repository: TypeInstanceRepository, id: number) {
	repository.getDetails(id);
}

export default function getTypeInstance(_parent, { type, id }) {
	const evaluatedType = type.toLowerCase();
	let repository: TypeInstanceRepository;

	if (isEnum(evaluatedType, EntityType)) {
		repository = TypeTransactionalRepository.getInstance();
	} else if (isEnum(evaluatedType, OperationType)) {
		repository = OperationTransactionalRepository.getInstance();
	} else {
		throw new GraphQLError(`Unknown type: ${type}`);
	}

	return a(repository, id);
}
