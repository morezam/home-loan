import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { client } from '../../lib/graphQlRequestDefault';
import { LOAN } from '../../query/queries/loan';
import { Loan, Loans } from '../../types/loan';
import { useState } from 'react';
import { DELETE_LOAN, UPDATE_LOAN } from '../../query/mutations/loan';
import { queryClient } from '../../lib/queryclient';
import Button from '../../components/Button';
import Modal from '../../components/modal';
import DataRenderer from '../../components/DataRenderer';
import { loanFieldData } from '../../data/loanFieldData';
import Layout from '../../components/Layout';
import Spinner from '../../components/spinner/Spinner';
import { GraphQlError } from '../../types/graphQlError';
import ErrorComponent from '../../components/ErrorComponent';

const Loan = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const loanId = router.query.loanId;

	const { data, isSuccess, isLoading, isError, error } = useQuery<
		Loans,
		GraphQlError
	>(['loan', { loanId }], () => {
		return client.request(LOAN, { id: loanId });
	});

	const deleteLoan = useMutation<unknown, GraphQlError, string>(
		id => {
			return client.request(DELETE_LOAN, { id });
		},
		{
			onSuccess() {
				queryClient
					.invalidateQueries(['loans'])
					.then(() => router.replace('/loans'));
			},
		}
	);

	const updateLoan = useMutation<Loan, GraphQlError, Loan>(
		updatedLoan => {
			return client.request(UPDATE_LOAN, { ...updatedLoan, id: loanId });
		},
		{
			onSuccess() {
				queryClient.invalidateQueries(['loans']);
			},
		}
	);

	if (isError) {
		return <ErrorComponent errorObject={error} />;
	}

	if (deleteLoan.isError) {
		return <ErrorComponent errorObject={deleteLoan.error} />;
	}

	if (updateLoan.isError) {
		return <ErrorComponent errorObject={updateLoan.error} />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	const handleClose = () => {
		setOpen(!open);
	};

	const onFormSubmit = (data: Loan) => {
		updateLoan.mutate({
			...data,
			numberOfInstalments: +data.numberOfInstalments,
			numberOfPeople: +data.numberOfPeople,
		});
	};

	return (
		<Layout>
			<div>
				{isSuccess && (
					<DataRenderer
						fieldData={loanFieldData}
						path="/loans"
						onFormSubmit={onFormSubmit}
						data={data.loan}>
						<Button bg="bg-red-500" onClick={() => handleClose()}>
							حذف
						</Button>
						<Modal isOpen={open} onRequestClose={() => handleClose()}>
							<div>آیا مطمئنید میخواهید این وام را حذف کنید؟</div>
							<div className="flex mt-5">
								<Button onClick={() => deleteLoan.mutate(data.loan.id)}>
									بله
								</Button>
								<Button
									bg="bg-secondary"
									textColor="text-black"
									onClick={() => handleClose()}>
									خیر
								</Button>
							</div>
						</Modal>
					</DataRenderer>
				)}
			</div>
		</Layout>
	);
};

export default Loan;
