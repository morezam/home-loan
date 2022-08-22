import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import ErrorComponent from '../../../components/ErrorComponent';
import Input from '../../../components/Input';
import Layout from '../../../components/Layout';
import Modal from '../../../components/modal';
import Spinner from '../../../components/spinner/Spinner';
import { client } from '../../../lib/graphQlRequestDefault';
import { queryClient } from '../../../lib/queryclient';
import { CREATE_INSTALLMENT } from '../../../query/mutations/installment';
import { ALL_LOANS } from '../../../query/queries/loan';
import { GraphQlError } from '../../../types/graphQlError';
import {
	CreateInstallmentData,
	LoanInstallments,
} from '../../../types/installments';
import { AllLoan } from '../../../types/loan';

const InstallmentCreate = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const borrowerId = router.query.borrowerId;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			loanId: '',
		},
	});
	const { data, isSuccess, isLoading, isError, error } = useQuery<
		AllLoan,
		GraphQlError
	>(
		['loans'],
		() => {
			return client.request(
				ALL_LOANS,
				{},
				{
					token: window.localStorage.getItem('token') as string,
				}
			);
		},
		{
			refetchOnMount: false,
			staleTime: 10 * 60 * 1000,
		}
	);

	const mutation = useMutation<
		LoanInstallments,
		GraphQlError,
		CreateInstallmentData
	>(
		newInstallment => {
			return client.request(CREATE_INSTALLMENT, newInstallment);
		},
		{
			onSuccess() {
				reset();
				setOpen(true);
				queryClient.invalidateQueries(['installment']);
			},
		}
	);

	if (isError) {
		return <ErrorComponent errorObject={error} />;
	}

	if (mutation.isError) {
		return <ErrorComponent errorObject={mutation.error} />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	const handleClose = () => {
		setOpen(!open);
	};

	const onFormSubmit = ({ loanId }: { loanId: string }) => {
		const theLoan = data?.allLoan.filter(loan => loan.id === loanId)[0];

		const newInstallment = {
			date: theLoan ? theLoan.startingDate : '',
			name: theLoan ? theLoan.name : '',
			price: theLoan ? theLoan.price : '',
			numberOfInstalments: theLoan ? theLoan.numberOfInstalments : 0,
			loan: loanId,
			borrower: borrowerId as string,
		};

		mutation.mutate(newInstallment);
	};

	return (
		<Layout>
			<div className="relative">
				<Link href={`/borrowers/${borrowerId}`}>
					<a className="absolute left-2">بازگشت</a>
				</Link>
				{isSuccess ? (
					data.allLoan.length !== 0 ? (
						<form onSubmit={handleSubmit(onFormSubmit)}>
							{data.allLoan.map(loan => {
								return (
									<div key={loan.id} className="pt-9">
										<Input
											register={register}
											type="radio"
											inputId={loan.id}
											name="loanId"
											label={loan.name}
											required
											fieldError={errors.loanId}
											value={loan.id}
										/>
									</div>
								);
							})}
							<Button>ثبت قسط</Button>
							<Modal isOpen={open} onRequestClose={handleClose}>
								<div>اقساط برای این وام گیرنده با موفقیت افزوده شد.</div>
								<Button onClick={handleClose}>بستن</Button>
							</Modal>
						</form>
					) : (
						<Alert>
							<p className="text-center">
								هنوز هیچ وامی ثبت نکرده اید. برای افزودن به{' '}
								<Link href="/loans/create">
									<a className="text-primary">اینجا</a>
								</Link>{' '}
								کنید.
							</p>
						</Alert>
					)
				) : null}
			</div>
		</Layout>
	);
};

export default InstallmentCreate;
