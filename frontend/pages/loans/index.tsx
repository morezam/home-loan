import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Alert from '../../components/Alert';
import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import Spinner from '../../components/spinner/Spinner';
import { Table, TableData } from '../../components/Table';
import { client } from '../../lib/graphQlRequestDefault';
import { ALL_LOANS } from '../../query/queries/loan';
import { GraphQlError } from '../../types/graphQlError';
import { AllLoan } from '../../types/loan';

const Loans = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery<
		AllLoan,
		GraphQlError
	>(['loans'], () => {
		return client.request(
			ALL_LOANS,
			{},
			{
				token: window.localStorage.getItem('token') as string,
			}
		);
	});

	if (isError) {
		return <ErrorComponent errorObject={error} />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Layout>
			{isSuccess ? (
				data.allLoan.length !== 0 ? (
					<div className="md:flex flex-col items-center">
						<h2 className="text-xl text-center mb-5">لیست وام های این صندوق</h2>
						<Table>
							<thead className="bg-background">
								<tr>
									<TableData>ردیف</TableData>
									<TableData>نام</TableData>
									<TableData>میزان وام</TableData>
									<TableData>تعداد اقساط</TableData>
									<TableData>تعداد افراد</TableData>
									<TableData> جزئیات</TableData>
								</tr>
							</thead>
							<tbody>
								{data.allLoan.map((loan, i) => {
									return (
										<tr key={loan.id}>
											<TableData>{i + 1}</TableData>
											<TableData noWrap>{loan.name}</TableData>
											<TableData noWrap>{loan.price}</TableData>
											<TableData>{loan.numberOfInstalments}</TableData>
											<TableData>{loan.numberOfPeople}</TableData>
											<TableData>
												<Link href={`/loans/${loan.id}`}>
													<a className="underline text-primary">مشاهده</a>
												</Link>
											</TableData>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				) : (
					<Alert>
						<p className="text-center">
							هنوز هیچ وامی ثبت نکرده اید. برای افزودن{' '}
							<Link href="/loans/create">
								<a className="text-primary">اینجا</a>
							</Link>{' '}
							را کلیک کنید.
						</p>
					</Alert>
				)
			) : null}
		</Layout>
	);
};

export default Loans;
