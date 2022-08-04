import { gql } from 'graphql-request';

export const CREATE_LOAN = gql`
	mutation (
		$name: String!
		$price: Int!
		$startingDate: String!
		$numberOfInstalments: Int!
		$description: String
		$users: [ID]
		$numberOfPeople: Int!
	) {
		createLoan(
			name: $name
			price: $price
			startingDate: $startingDate
			numberOfInstalments: $numberOfInstalments
			description: $description
			numberOfPeople: $numberOfPeople
			users: $users
		) {
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

export const UPDATE_LOAN = gql`
	mutation (
		$id: ID!
		$name: String
		$price: Int
		$startingDate: String
		$numberOfInstalments: Int
		$description: String
		$users: [ID]
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
			users: $users
		) {
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

export const DELETE_LOAN = gql`
	mutation ($id: ID!) {
		deleteLoan(id: $id) {
			id
			name
		}
	}
`;
