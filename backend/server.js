require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const userModel = require('./models/userModel');
const loanModel = require('./models/loanModel');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	context: () => {
		return {
			userModel,
			loanModel,
		};
	},
});

server.listen().then(() => {
	mongoose.connect(`mongodb://127.0.0.1:27017/ballot`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});
