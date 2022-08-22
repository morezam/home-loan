import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { client } from '../lib/graphQlRequestDefault';
import { queryClient } from '../lib/queryclient';
import { DELETE_INSTALLMENT } from '../query/mutations/installment';
import Button from './Button';

interface MutationComponentProps {
	children: React.ReactNode;
	query: string;
	variables: any;
	refetch?: string;
	routeAfterSuccess?: string;
}

const MutationComponent = ({
	children,
	query,
	variables,
	refetch,
	routeAfterSuccess,
}: MutationComponentProps) => {
	const router = useRouter();

	const mutation = useMutation(
		variables => {
			return client.request(query, variables);
		},
		{
			onSuccess(data, variables, context) {
				refetch
					? queryClient
							.invalidateQueries([refetch])
							.then(
								routeAfterSuccess
									? () => router.replace(routeAfterSuccess)
									: () => false
							)
					: null;
			},
		}
	);
	return <Button onClick={() => mutation.mutate(variables)}>{children}</Button>;
};

export default MutationComponent;
