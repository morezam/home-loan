import { gql } from 'apollo-server';

export const borrowerSchema = gql`
	type Borrower {
		firstName: String!
		lastName: String!
		id: ID!
		nationalCode: String!
		phoneNumber: String!
		fatherName: String!
		userId: ID!
	}

	extend type Query {
		borrower(id: ID!): Borrower!
		allBorrowers: [Borrower]!
	}

	extend type Mutation {
		createBorrower(
			firstName: String!
			lastName: String!
			nationalCode: String!
			phoneNumber: String!
			fatherName: String!
		): Borrower!

		updateBorrower(
			id: ID!
			firstName: String
			lastName: String
			nationalCode: String
			phoneNumber: String
			fatherName: String
		): Borrower!

		deleteBorrower(borrowerId: ID!): Borrower
	}
`;
