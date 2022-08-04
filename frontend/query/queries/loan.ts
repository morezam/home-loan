import { gql } from 'graphql-request';

export const ALL_LOANS = gql`
	query {
		allLoan {
			id
			name
			price
			startingDate
			numberOfInstalments
			description
			users {
				id
			}
			numberOfPeople
		}
	}
`;

export const LOAN = gql`
	query ($id: ID!) {
		loan(id: $id) {
			name
			price
			startingDate
			numberOfInstalments
			description
			users {
				id
			}
			numberOfPeople
		}
	}
`;
