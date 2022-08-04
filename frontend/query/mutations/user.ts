import { gql } from 'graphql-request';

export const CREATE_USER = gql`
	mutation (
		$firstName: String!
		$lastName: String!
		$nationalCode: Int!
		$phoneNumber: Int!
		$fatherName: String!
		$loans: [ID]
	) {
		createUser(
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

export const UPDATE_USER = gql`
	mutation (
		$id: ID!
		$firstName: String
		$lastName: String
		$nationalCode: Int
		$phoneNumber: Int
		$fatherName: String
		$loans: [ID]
	) {
		updateUser(
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

export const DELETE_USER = gql`
	mutation ($id: ID!) {
		deleteUser(id: $id) {
			firstName
			lastName
			id
		}
	}
`;
