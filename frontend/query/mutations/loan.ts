import { gql } from 'graphql-request';

export const CREATE_LOAN = gql`
	mutation (
		$name: String!
		$price: String!
		$startingDate: String!
		$numberOfInstalments: Int!
		$description: String
		$borrowers: [ID]
		$numberOfPeople: Int!
	) {
		createLoan(
			name: $name
			price: $price
			startingDate: $startingDate
			numberOfInstalments: $numberOfInstalments
			description: $description
			numberOfPeople: $numberOfPeople
			borrowers: $borrowers
		) {
			id
		}
	}
`;

export const UPDATE_LOAN = gql`
	mutation (
		$id: ID!
		$name: String
		$price: String
		$startingDate: String
		$numberOfInstalments: Int
		$description: String
		$numberOfPeople: Int
	) {
		updateLoan(
			id: $id
			name: $name
			price: $price
			startingDate: $startingDate
			numberOfInstalments: $numberOfInstalments
			description: $description
			numberOfPeople: $numberOfPeople
		) {
			id
		}
	}
`;

export const DELETE_LOAN = gql`
	mutation ($id: ID!) {
		deleteLoan(id: $id) {
			id
		}
	}
`;
