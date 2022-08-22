import { useMutation } from '@tanstack/react-query';
import { DatePicker } from 'jalali-react-datepicker';
import { useState } from 'react';
import { client } from '../../lib/graphQlRequestDefault';
import { CREATE_LOAN } from '../../query/mutations/loan';
import { Loan } from '../../types/loan';
import { persianDateCreator } from '../../lib/persianDateCreator';
import DataRenderer from '../../components/DataRenderer';
import { loanFieldData } from '../../data/loanFieldData';
import Layout from '../../components/Layout';
import { GraphQlError } from '../../types/graphQlError';
import ErrorComponent from '../../components/ErrorComponent';

const CreateLoan = () => {
	const [value, setValue] = useState(new Date());

	const { mutate, isError, error } = useMutation<Loan, GraphQlError, Loan>(
		newLoan => {
			return client.request(CREATE_LOAN, newLoan, {
				token: window.localStorage.getItem('token') as string,
			});
		}
	);

	if (isError) {
		return <ErrorComponent errorObject={error} />;
	}

	const onFormSubmit = (data: Loan) => {
		mutate({
			...data,
			numberOfInstalments: +data.numberOfInstalments,
			numberOfPeople: +data.numberOfPeople,
			startingDate: persianDateCreator(value),
		});
	};

	return (
		<Layout>
			<DataRenderer
				fieldData={loanFieldData}
				path="/loans"
				onFormSubmit={onFormSubmit}
				create={true}>
				<DatePicker
					value={value}
					timePicker={false}
					ClockIcon={undefined}
					label="تاریخ آغاز وام را انتخاب کنید"
					onClickSubmitButton={date => setValue(date.value._d)}
					className="mt-2 mb-3 py-1 rounded w-full border-black border-2 px-1 md:py-2"
				/>
			</DataRenderer>
		</Layout>
	);
};

export default CreateLoan;
