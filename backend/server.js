require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const borrowerModel = require('./models/borrowerModel');
const userModel = require('./models/userModel');
const loanModel = require('./models/loanModel');

const getUser = async req => {
	const token = req.headers['token'];
	if (token) {
		try {
			return await jwt.verify(token, 'riddlemethis');
		} catch (e) {
			throw new Error('Your session expired. Sign in again.');
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
				},
			};
		}
	},
});

server.listen().then(() => {
	mongoose.connect(`mongodb://127.0.0.1:27017/ballot`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});
