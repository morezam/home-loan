const { gql } = require('apollo-server');

module.exports = gql`
	type Installments {
		date: String!
		price: String!
		paid: Boolean
		paidDate: String
	}

	type LoanInstallments {
		loan: ID!
		borrower: ID!
		name: String!
		wonAt: String
		installments: [Installments]!
	}

	extend type Query {
		installment(borrower: ID, loan: ID): [LoanInstallments]!
	}

	extend type Mutation {
		createInstallment(
			date: String!
			price: String!
			paid: Boolean
			paidDate: String
			loan: String!
			borrower: String!
			name: String!
			numberOfInstalments: Int!
		): LoanInstallments!

		payInstallment(
			loanId: String!
			borrowerId: String!
			date: String!
		): Installments

		winDate(loanId: String!, borrowerId: String!): Installments

		deleteInstallment(borrowerId: String!): LoanInstallments
	}
`;
