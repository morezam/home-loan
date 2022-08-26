import { gql } from 'apollo-server';
import { borrowerSchema } from './borrowerSchema';
import { loanSchema } from './loanSchema';
import { userSchema } from './userSchema';
import { installmentSchema } from './installmentSchema';

const linkSchema = gql`
	type Query {
		_: Boolean
	}
	type Mutation {
		_: Boolean
	}
`;

export const typeDefs = [
	linkSchema,
	borrowerSchema,
	loanSchema,
	userSchema,
	installmentSchema,
];
