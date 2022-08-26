import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { client } from '../../../lib/graphQlRequestDefault';
import { BORROWER } from '../../../query/queries/borrower';
import { Borrower, Borrowers } from '../../../types/borrower';
import { queryClient } from '../../../lib/queryclient';
import {
	DELETE_BORROWER,
	UPDATE_BORROWER,
} from '../../../query/mutations/borrower';
import MutationComponent from '../../../components/MutationComponent';
import ShowInstallments from '../../../components/installment/ShowInstallments';
import Modal from '../../../components/modal';
import Button from '../../../components/Button';
import DataRenderer from '../../../components/DataRenderer';
import { borrowerFieldData } from '../../../data/borrowerFieldData';
import Layout from '../../../components/Layout';
import Spinner from '../../../components/spinner/Spinner';
import ErrorComponent from '../../../components/ErrorComponent';
import { GraphQlError } from '../../../types/graphQlError';
import { AllInstallment } from '../../../types/installments';
import { INSTALLMENT } from '../../../query/queries/installment';

const Borrower = ({ borrowerId }: { borrowerId: string }) => {
	const [open, setOpen] = useState(false);
	const { data, isSuccess, isLoading, isError, error } = useQuery<
		Borrowers,
		GraphQlError
	>(
		['borrower', { borrowerId }],
		() => {
			return client.request(BORROWER, { id: borrowerId });
		},
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);

	const {
		data: installmentData,
		isLoading: installmentLoading,
		isError: installmentIsError,
		error: installmentError,
	} = useQuery<AllInstallment, GraphQlError>(['installment'], () => {
		return client.request(INSTALLMENT, {
			borrower: borrowerId,
		});
	});

	const updateBorrower = useMutation(
		(updatedBorrower: Borrower) => {
			return client.request(UPDATE_BORROWER, {
				...updatedBorrower,
				id: borrowerId,
			});
		},
		{
			onSuccess(data, variables, context) {
				queryClient.invalidateQueries(['borrowers']);
			},
		}
	);

	if (isError) {
		return <ErrorComponent errorObject={error} />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	const handleClose = () => {
		setOpen(!open);
	};

	const onFormSubmit = (updatedBorrower: Borrower) => {
		updateBorrower.mutate(updatedBorrower);
	};

	return (
		<Layout>
			<div>
				{isSuccess && (
					<div>
						<DataRenderer
							onFormSubmit={onFormSubmit}
							data={data.borrower}
							fieldData={borrowerFieldData}
							path="/borrowers">
							<Link href={`/borrowers/${borrowerId}/installmentCreate`}>
								<a className="bg-background text-center m-1 rounded-md py-2 px-3 text-slate-600 active:translate-y-1 active:shadow-2xl">
									افزودن اقساط برای این کاربر
								</a>
							</Link>
							<Button bg="bg-red-500" onClick={handleClose}>
								حذف
							</Button>
						</DataRenderer>
						<Modal isOpen={open} onRequestClose={handleClose}>
							<div>آیا مطمئنید می خواهید این کاربر را حذف کنید؟</div>
							<div>
								<MutationComponent
									query={DELETE_BORROWER}
									variables={{ borrowerId: data.borrower.id }}
									refetch="borrowers"
									routeAfterSuccess="/borrowers">
									حذف{' '}
								</MutationComponent>
								<Button
									bg="bg-background"
									textColor="text-black"
									onClick={handleClose}>
									خیر
								</Button>
							</div>
						</Modal>
						{installmentLoading ? (
							<Spinner />
						) : installmentIsError ? (
							<ErrorComponent errorObject={installmentError} />
						) : (
							<ShowInstallments installmentData={installmentData} />
						)}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Borrower;

export const getServerSideProps: GetServerSideProps = async context => {
	const borrowerId = context.params?.borrowerId;
	return {
		props: { borrowerId },
	};
};
