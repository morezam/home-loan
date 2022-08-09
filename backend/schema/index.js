const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		email: String!
		id: ID!
		loans: [Loan]!
		borrowers: [Borrower]!
	}

	type Loan {
		id: ID!
		name: String!
		price: Int!
		startingDate: String!
		numberOfInstalments: Int!
		description: String
		users: [User]!
		numberOfPeople: Int!
		userId: ID!
	}

	type Borrower {
		firstName: String!
		lastName: String!
		id: ID!
		nationalCode: Int!
		phoneNumber: Int!
		loans: [Loan]!
		fatherName: String!
		userId: ID!
	}

	type UserWithToken {
		token: String!
		user: User!
	}

	type Query {
		user(id: ID!): User!
		loan(id: ID!): Loan!
		allLoan: [Loan]!
		borrower(id: ID!): Borrower!
		allBorrowers: [Borrower]!
		login(email: String!, password: String!): UserWithToken!
	}

	type Mutation {
		createUser(email: String!, password: String!): UserWithToken!

		createBorrower(
			firstName: String!
			lastName: String!
			nationalCode: Int!
			loans: [ID]
			phoneNumber: Int!
			fatherName: String!
		): Borrower!

		deleteBorrower(id: ID!): Borrower

		updateBorrower(
			id: ID!
			firstName: String
			lastName: String
			nationalCode: Int
			phoneNumber: Int
			loans: [ID]
			fatherName: String
		): Borrower!

		createLoan(
			name: String!
			price: Int!
			startingDate: String!
			numberOfInstalments: Int!
			description: String
			numberOfPeople: Int!
			users: [ID]
		): Loan!

		updateLoan(
			id: ID!
			name: String
			price: Int
			startingDate: String
			numberOfInstalments: Int
			description: String
			numberOfPeople: Int
			users: [ID]
		): Loan!

		deleteLoan(id: ID!): Loan
	}
`;
