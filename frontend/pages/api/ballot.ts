import { ApolloServer } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import { typeDefs } from '../../backend/schema';
import { resolvers } from '../../backend/resolvers';

import { borrowerModel } from '../../backend/models/borrowerModel';
import { userModel } from '../../backend/models/userModel';
import { loanModel } from '../../backend/models/loanModel';
import { installmentModel } from '../../backend/models/installmentModel';
import { Request } from 'express-serve-static-core';

const getUser = async (req: Request) => {
	const token = req.headers['token'];
	if (token) {
		try {
			return await jwt.verify(token as string, 'riddlemethis');
		} catch (e) {
			throw new Error(`Your session expired. Sign in again. ${e}`);
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	context: async ({ req }) => {
		if (req) {
			const authenticatedUser = await getUser(req);
			return {
				authenticatedUser,
				models: {
					userModel,
					loanModel,
					borrowerModel,
					installmentModel,
				},
			};
		}
	},
});

const startServer = server.start().then(() => {
	mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}`);
});

export default async function handler(req: any, res: any) {
	await startServer;
	await server.createHandler({ path: '/api/ballot' })(req, res);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
