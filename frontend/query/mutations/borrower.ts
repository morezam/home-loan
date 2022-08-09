import { gql } from 'graphql-request';

export const CREATE_BORROWER = gql`
	mutation (
		$firstName: String!
		$lastName: String!
		$nationalCode: Int!
		$phoneNumber: Int!
		$fatherName: String!
		$loans: [ID]
	) {
		createBorrower(
			firstName: $firstName
			lastName: $lastName
			nationalCode: $nationalCode
			phoneNumber: $phoneNumber
			fatherName: $fatherName
			loans: $loans
		) {
			firstName
			id
			lastName
			nationalCode
			phoneNumber
			loans {
				id
			}
			fatherName
		}
	}
`;

export const UPDATE_BORROWER = gql`
	mutation (
		$id: ID!
		$firstName: String
		$lastName: String
		$nationalCode: Int
		$phoneNumber: Int
		$fatherName: String
		$loans: [ID]
	) {
		updateBorrower(
			id: $id
			firstName: $firstName
			lastName: $lastName
			nationalCode: $nationalCode
			phoneNumber: $phoneNumber
			fatherName: $fatherName
			loans: $loans
		) {
			firstName
			id
			lastName
			nationalCode
			phoneNumber
			loans {
				id
			}
			fatherName
		}
	}
`;

export const DELETE_BORROWER = gql`
	mutation ($id: ID!) {
		deleteBorrower(id: $id) {
			firstName
			lastName
			id
		}
	}
`;
