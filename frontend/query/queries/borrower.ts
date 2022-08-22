import { gql } from 'graphql-request';

export const ALL_BORROWERS = gql`
	query {
		allBorrowers {
			firstName
			lastName
			nationalCode
			phoneNumber
			id
		}
	}
`;

export const BORROWER = gql`
	query ($id: ID!) {
		borrower(id: $id) {
			firstName
			lastName
			id
			nationalCode
			phoneNumber
			fatherName
		}
	}
`;
