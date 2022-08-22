import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Alert from '../../components/Alert';
import ErrorComponent from '../../components/ErrorComponent';
import Layout from '../../components/Layout';
import Spinner from '../../components/spinner/Spinner';
import { Table, TableData } from '../../components/Table';
import { client } from '../../lib/graphQlRequestDefault';
import { ALL_BORROWERS } from '../../query/queries/borrower';
import { AllBorrowers } from '../../types/borrower';
import { GraphQlError } from '../../types/graphQlError';

const Borrowers = () => {
	const { data, isLoading, isSuccess, isError, error } = useQuery<
		AllBorrowers,
		GraphQlError
	>(['borrowers'], () => {
		return client.request(
			ALL_BORROWERS,
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
				data.allBorrowers.length !== 0 ? (
					<div className="sm:flex flex-col items-center">
						<h2 className="text-xl mb-5 text-center ">لیست اعضای این صندوق</h2>
						<Table>
							<thead className="bg-background">
								<tr>
									<TableData>ردیف</TableData>
									<TableData>نام</TableData>
									<TableData noWrap>نام خانوادگی</TableData>
									<TableData>کد ملی</TableData>
									<TableData>شماره همراه</TableData>
									<TableData>جزئیات</TableData>
								</tr>
							</thead>
							<tbody>
								{isSuccess &&
									data.allBorrowers.map((borrower, i) => {
										return (
											<tr key={borrower.id}>
												<TableData>{i + 1}</TableData>
												<TableData noWrap>{borrower.firstName}</TableData>
												<TableData noWrap>{borrower.lastName}</TableData>
												<TableData noWrap>{borrower.nationalCode}</TableData>
												<TableData noWrap>{borrower.phoneNumber}</TableData>
												<TableData>
													<Link href={`/borrowers/${borrower.id}`}>
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
							هیچ کاربری را اضافه نکرده اید برای افزودن به{' '}
							<Link href="/borrowers/create">
								<a className="text-primary">اینجا</a>
							</Link>{' '}
							مراجعه کنید.
						</p>
					</Alert>
				)
			) : null}
		</Layout>
	);
};

export default Borrowers;
