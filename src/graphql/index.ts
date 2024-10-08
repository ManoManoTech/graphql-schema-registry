import { ApolloServer } from 'apollo-server-express';
import { getServerProps } from './server';

let server;

export const initServer = async (app) => {
	const props = getServerProps();

	server = new ApolloServer(props);

	await server.start();

	server.applyMiddleware({ app });
};

export const getServer = () => {
	return server;
};
