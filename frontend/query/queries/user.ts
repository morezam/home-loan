import { gql } from 'graphql-request';

export const ALL_USERS = gql`
	query {
		allUsers {
			firstName
			lastName
			id
		}
	}
`;

export const USER = gql`
	query ($id: ID!) {
		user(id: $id) {
			firstName
			lastName
			id
			nationalCode
			phoneNumber
			loans {
				id
			}
			fatherName
		}
	}
`;
