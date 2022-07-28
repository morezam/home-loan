const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		firstName: String!
		lastName: String!
		id: ID!
		nationalCode: Int!
		phoneNumber: Int!
		loans: [Loan]!
		fatherName: String!
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
	}

	type Query {
		user(id: ID!): User!
		allUsers: [User]!
		loan(id: ID!): Loan!
		allLoan: [Loan]!
	}

	type Mutation {
		createUser(
			firstName: String!
			lastName: String!
			nationalCode: Int!
			loans: [String]
			phoneNumber: Int!
			fatherName: String!
		): User!

		deleteUser(id: ID!): User

		updateUser(
			id: ID!
			firstName: String
			lastName: String
			nationalCode: Int
			phoneNumber: Int
			loans: [String]
			fatherName: String
		): User!

		createLoan(
			name: String!
			price: Int!
			startingDate: String!
			numberOfInstalments: Int!
			description: String
			numberOfPeople: Int!
		): Loan!

		updateLoan(
			id: ID!
			name: String!
			price: Int!
			startingDate: String!
			numberOfInstalments: Int!
			description: String
			numberOfPeople: Int!
		): Loan!

		deleteLoan(id: ID!): Loan
	}
`;
