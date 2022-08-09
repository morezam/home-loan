import { gql } from 'graphql-request';

export const CREATE_USER = gql`
	mutation ($email: String!, $password: String!) {
		createUser(email: $email, password: $password) {
			token
			user {
				email
				id
				loans {
					id
				}
				borrowers {
					id
				}
			}
		}
	}
`;
