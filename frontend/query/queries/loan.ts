import { gql } from 'graphql-request';

export const ALL_LOANS = gql`
	query {
		allLoan {
			id
			name
			price
			startingDate
			numberOfInstalments
			numberOfPeople
		}
	}
`;

export const LOAN = gql`
	query ($id: ID!) {
		loan(id: $id) {
			id
			name
			price
			startingDate
			numberOfInstalments
			description
			borrowers {
				id
			}
			numberOfPeople
		}
	}
`;
