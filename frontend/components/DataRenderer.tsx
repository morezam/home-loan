import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FieldData } from '../types/fieldData';
import { createDefaultValues } from '../lib/createDefaultValues';
import Input from './Input';
import Button from './Button';
import Modal from './modal';

interface DataRendererProps<T> {
	children?: React.ReactNode;
	data?: T;
	onFormSubmit: (data: any) => void;
	create?: boolean;
	fieldData: FieldData[];
	path: string;
}

const DataRenderer = <T,>({
	children,
	data,
	onFormSubmit,
	create,
	fieldData,
	path,
}: DataRendererProps<T>) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: createDefaultValues(fieldData),
	});

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const handleClose = () => {
		setOpen(!open);
	};

	return (
		<div className="flex justify-center">
			<form
				onSubmit={handleSubmit(onFormSubmit)}
				className="flex flex-col w-96 p-5">
				{fieldData.map(field => (
					<Input
						register={register}
						key={field.label}
						label={field.label}
						fieldError={errors[field.name]}
						inputId={field.name}
						name={field.name}
						required={field.notRequired ? false : true}
					/>
				))}

				{children}
				<Button onClick={() => handleClose()}>
					{create ? 'افزودن' : 'به روز رسانی'}
				</Button>
				<Modal isOpen={open} onRequestClose={() => handleClose()}>
					<div>
						این {path === '/borrowers' ? 'کاربر' : 'وام'} به طرز موفقیت آمیزی{' '}
						{create ? 'ساخته' : 'به روز رسانی'} شد
					</div>
					<Button
						onClick={() => {
							router.replace(path);
							handleClose();
						}}>
						خروج و بازگشت به صفحه {path === '/borrowers' ? 'کاربران' : 'وام ها'}
					</Button>
				</Modal>
			</form>
		</div>
	);
};

export default DataRenderer;
