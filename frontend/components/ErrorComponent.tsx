import { useRouter } from 'next/router';
import { GraphQlError } from '../types/graphQlError';
import Button from './Button';

const ErrorComponent = ({ errorObject }: { errorObject: GraphQlError }) => {
	const router = useRouter();
	return (
		<div
			role="alert"
			className="flex flex-col h-screen w-screen justify-center items-center">
			{errorObject.response.errors.map(err => (
				<div key={err.message} className="my-7">
					<p className="text-red-600 text-2xl">{err.message}</p>
				</div>
			))}
			<Button onClick={() => router.reload()}>بارگزاری مجدد صفحه</Button>
		</div>
	);
};

export default ErrorComponent;
