import { gql } from 'graphql-request';

export const CREATE_BORROWER = gql`
	mutation (
		$firstName: String!
		$lastName: String!
		$nationalCode: String!
		$phoneNumber: String!
		$fatherName: String!
	) {
		createBorrower(
			firstName: $firstName
			lastName: $lastName
			nationalCode: $nationalCode
			phoneNumber: $phoneNumber
			fatherName: $fatherName
		) {
			firstName
			id
			lastName
			nationalCode
			phoneNumber
			fatherName
		}
	}
`;

export const UPDATE_BORROWER = gql`
	mutation (
		$id: ID!
		$firstName: String
		$lastName: String
		$nationalCode: String
		$phoneNumber: String
		$fatherName: String
	) {
		updateBorrower(
			id: $id
			firstName: $firstName
			lastName: $lastName
			nationalCode: $nationalCode
			phoneNumber: $phoneNumber
			fatherName: $fatherName
		) {
			id
		}
	}
`;

export const DELETE_BORROWER = gql`
	mutation ($borrowerId: ID!) {
		deleteBorrower(borrowerId: $borrowerId) {
			id
		}
	}
`;
