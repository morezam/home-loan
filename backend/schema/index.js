const { gql } = require('apollo-server');
const borrowerSchema = require('./borrowerSchema');
const loanSchema = require('./loanSchema');
const userSchema = require('./userSchema');
const installmentSchema = require('./installmentSchema');

const linkSchema = gql`
	type Query {
		_: Boolean
	}
	type Mutation {
		_: Boolean
	}
`;

module.exports = [
	linkSchema,
	borrowerSchema,
	loanSchema,
	userSchema,
	installmentSchema,
];
