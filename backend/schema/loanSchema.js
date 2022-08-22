const { gql } = require('apollo-server');

module.exports = gql`
	type Loan {
		id: ID!
		name: String!
		price: String!
		startingDate: String!
		numberOfInstalments: Int!
		description: String
		borrowers: [Borrower]!
		numberOfPeople: Int!
		userId: ID!
	}

	extend type Query {
		loan(id: ID!): Loan!
		allLoan: [Loan]!
	}

	extend type Mutation {
		createLoan(
			name: String!
			price: String!
			startingDate: String!
			numberOfInstalments: Int!
			description: String
			numberOfPeople: Int!
			borrowers: [ID]
		): Loan!

		updateLoan(
			id: ID!
			name: String
			price: String
			startingDate: String
			numberOfInstalments: Int
			description: String
			numberOfPeople: Int
			borrowers: [ID]
		): Loan!

		deleteLoan(id: ID!): Loan
	}
`;
