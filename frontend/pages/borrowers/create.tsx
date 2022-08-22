import { useMutation } from '@tanstack/react-query';
import React from 'react';
import DataRenderer from '../../components/DataRenderer';
import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import { borrowerFieldData } from '../../data/borrowerFieldData';
import { client } from '../../lib/graphQlRequestDefault';
import { queryClient } from '../../lib/queryclient';
import { CREATE_BORROWER } from '../../query/mutations/borrower';
import { Borrower } from '../../types/borrower';
import { GraphQlError } from '../../types/graphQlError';

const CreateBorrower = () => {
	const mutation = useMutation<Borrower, GraphQlError, Borrower>(
		newBorrower => {
			return client.request(CREATE_BORROWER, newBorrower, {
				token: window.localStorage.getItem('token') as string,
			});
		},
		{
			onSuccess() {
				queryClient.invalidateQueries(['borrowers']);
			},
		}
	);

	if (mutation.isError) {
		return <ErrorComponent errorObject={mutation.error} />;
	}

	const onFormSubmit = (newBorrower: Borrower) => {
		mutation.mutate({
			...newBorrower,
		});
	};
	return (
		<Layout>
			<DataRenderer
				fieldData={borrowerFieldData}
				path="/borrowers"
				onFormSubmit={onFormSubmit}
				create={true}
			/>
		</Layout>
	);
};

export default CreateBorrower;
