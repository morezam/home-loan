import { useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';

interface UserData {
	email: string;
	password: string;
}

interface SignupFormProps {
	onFormSubmit: (data: UserData) => void;
	signup: boolean;
	errorMessage: string | null;
}

const SignupForm = ({
	onFormSubmit,
	signup,
	errorMessage,
}: SignupFormProps) => {
	const {
		register,
		handleSubmit,
		// TODO : add error functionality like input is empty
		formState: { errors },
	} = useForm<UserData>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<div className="flex flex-col bg-background w-3/4 rounded-xl p-10 text-center md:w-1/4 md:h-2/3 md:justify-around">
			<h2 className="text-lg mb-3 sm:text-xl md:text-2xl md:mb-0">
				{' '}
				لطفا اطلاعات خود را برای{' '}
				{signup ? 'ثبت نام' : 'وارد شدن به حساب کاربری '} واردکنید
			</h2>
			<form
				onSubmit={handleSubmit(onFormSubmit)}
				className="flex flex-col items-center">
				<Input
					inputId="email"
					name="email"
					register={register}
					required={true}
					type="email"
					pattern={/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}
					label="ایمیل:"
					fieldError={errors.email}
					message="ایمیل نامعتبر می باشد"
				/>
				<Input
					inputId="password"
					name="password"
					register={register}
					required={true}
					type="password"
					pattern={/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/}
					label="رمز عبور:"
					fieldError={errors.password}
					message="رمز عبور شما باید شامل هشت کاراکتر و حداقل یک حرف کوچک، یک حرف بزرگ و یک حرف خاص باشد."
				/>
				<Button>{signup ? 'ثبت نام' : 'وارد شدن به حساب'}</Button>
				{errorMessage && (
					<span className="text-red-500 mt-3">{errorMessage}</span>
				)}
			</form>
		</div>
	);
};

export default SignupForm;
