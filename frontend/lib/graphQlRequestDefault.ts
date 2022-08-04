import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('http://localhost:4000/graphql', {
	mode: 'cors',
	headers: {
		'Access-Control-Allow-Origin': 'http://localhost:3000/',
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token',
	},
});
