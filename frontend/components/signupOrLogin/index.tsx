import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/authContext';
import { AuthActionKind } from '../../context/authReducer';
import { client } from '../../lib/graphQlRequestDefault';
import { CREATE_USER, LOGIN } from '../../query/mutations/user';
import { GraphQlError } from '../../types/graphQlError';
import Spinner from '../spinner/Spinner';
import SignupForm from './SignupForm';

interface UserData {
	email: string;
	password: string;
}

interface FetchedData {
	createUser: {
		token: string;
	};
	login: {
		token: string;
	};
}

const UserSign = ({ signup }: { signup: boolean }) => {
	const { dispatch } = useAuthContext();
	const router = useRouter();

	const { mutate, isLoading, isError, error } = useMutation<
		FetchedData,
		GraphQlError,
		UserData
	>(
		newUser => {
			return client.request(signup ? CREATE_USER : LOGIN, newUser);
		},
		{
			onSuccess(data) {
				dispatch({
					type: AuthActionKind.LOGIN,
					payload: signup ? data.createUser.token : data.login.token,
				});
				router.push('/dashboard');
			},
		}
	);

	const onFormSubmit = (data: UserData) =>
		mutate({
			...data,
		});

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="h-screen w-screen flex justify-center items-center relative">
			<SignupForm
				signup={signup}
				onFormSubmit={onFormSubmit}
				errorMessage={isError ? error.response.errors[0].message : null}
			/>
		</div>
	);
};

export default UserSign;
