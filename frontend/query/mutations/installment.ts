import { gql } from 'graphql-request';

export const CREATE_INSTALLMENT = gql`
	mutation (
		$date: String!
		$price: String!
		$paid: Boolean
		$paidDate: String
		$loan: String!
		$borrower: String!
		$name: String!
		$numberOfInstalments: Int!
	) {
		createInstallment(
			date: $date
			price: $price
			paid: $paid
			paidDate: $paidDate
			loan: $loan
			borrower: $borrower
			name: $name
			numberOfInstalments: $numberOfInstalments
		) {
			name
		}
	}
`;

export const PAY_INSTALLMENT = gql`
	mutation ($loanId: String!, $date: String!, $borrowerId: String!) {
		payInstallment(loanId: $loanId, date: $date, borrowerId: $borrowerId) {
			paid
		}
	}
`;

export const WIN_DATE = gql`
	mutation ($loanId: String!, $borrowerId: String!) {
		winDate(loanId: $loanId, borrowerId: $borrowerId) {
			date
		}
	}
`;

export const DELETE_INSTALLMENT = gql`
	mutation ($borrowerId: String!) {
		deleteInstallment(borrowerId: $borrowerId) {
			loan
		}
	}
`;
