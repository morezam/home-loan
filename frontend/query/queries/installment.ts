import { gql } from 'graphql-request';

export const INSTALLMENT = gql`
	query ($borrower: ID, $loan: ID) {
		installment(borrower: $borrower, loan: $loan) {
			name
			loan
			borrower
			wonAt
			installments {
				date
				price
				paid
				paidDate
			}
		}
	}
`;
