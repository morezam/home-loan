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

export const LOGIN = gql`
	query ($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
			}
		}
	}
`;
