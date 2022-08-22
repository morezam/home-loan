import { QueryClient } from '@tanstack/react-query';
import { GraphQLError } from 'graphql-request/dist/types';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			useErrorBoundary: true,
			staleTime: 10000,
			retry: 2,
			retryDelay: 1000,
		},
	},
});
