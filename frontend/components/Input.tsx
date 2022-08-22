import { FieldError, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<T> {
	type?: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	required: boolean;
	inputId: string;
	lengthMin?: number;
	pattern?: RegExp;
	message?: string;
	label: string;
	fieldError: FieldError | undefined;
	lengthMax?: number;
	value?: string | number | readonly string[] | undefined;
}

const Input = <T,>({
	type,
	register,
	name,
	inputId,
	required,
	lengthMin = 1,
	pattern,
	message,
	label,
	fieldError,
	lengthMax = 2000,
	value,
}: InputProps<T>) => {
	const errorSpans = (type: string) => {
		if (fieldError) {
			if (fieldError.type === type) {
				return (
					<span key={type} className="text-red-600 mb-2">
						{fieldError.message}
					</span>
				);
			}
		}
	};

	return (
		<>
			<label htmlFor={inputId} className="m-2">
				{label}
			</label>
			<input
				className="mb-3 py-1 rounded border-black border-2 px-1 md:py-2 "
				type={type ? type : 'text'}
				value={value ? value : undefined}
				{...register(name, {
					required: {
						value: required,
						message: required ? 'این فیلد باید پر شود.' : '',
					},
					minLength: {
						value: lengthMin,
						message: `این فیلد باید حداقل ${lengthMin} کاراکتر باشد.`,
					},
					maxLength: {
						value: lengthMax,
						message: `این فیلد می تواند حداکثر ${lengthMax} کاراکتر باشد.`,
					},
					pattern: {
						value: pattern ? pattern : /[\s\S]*/,
						message: message ? message : '',
					},
				})}
				id={inputId}
			/>
			{['required', 'minLength', 'maxLength', 'pattern'].map(item =>
				errorSpans(item)
			)}
		</>
	);
};

export default Input;
