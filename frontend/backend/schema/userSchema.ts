import { gql } from 'apollo-server';

export const userSchema = gql`
	type User {
		email: String!
		id: ID!
		loans: [Loan]!
		borrowers: [Borrower]!
	}

	type UserWithToken {
		token: String!
		user: User!
	}

	extend type Query {
		user(id: ID!): User!
	}

	extend type Mutation {
		createUser(email: String!, password: String!): UserWithToken!
		login(email: String!, password: String!): UserWithToken!
	}
`;
