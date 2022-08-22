import ErrorComponent from '../components/ErrorComponent';

const errorObject = {
	response: {
		errors: [
			{
				message: 'خطایی  اتفاق افتاد.',
				locations: [
					{
						line: 4,
						column: 4,
					},
				],
				path: ['kfkfk'],
				extensions: {
					code: 'string',
					exception: {
						stacktrace: ['fffk'],
					},
				},
			},
		],
		headers: {
			map: {
				jfjf: 'fmkfmf',
			},
		},
		status: 404,
	},
};

const ErrorPage = () => {
	return <ErrorComponent errorObject={errorObject} />;
};

export default ErrorPage;
