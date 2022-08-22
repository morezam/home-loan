import { gql } from 'graphql-request';

export const USER = gql`
	query ($id: ID!) {
		user(id: $id) {
			email
			loans {
				id
			}
			borrowers {
				id
			}
		}
	}
`;
