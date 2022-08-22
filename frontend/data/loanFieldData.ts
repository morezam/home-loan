import { FieldData } from '../types/fieldData';

export const loanFieldData: FieldData[] = [
	{
		name: 'name',
		label: 'نام وام :',
		defaultVal: { name: '' },
	},
	{
		name: 'price',
		label: 'میزان وام :',
		defaultVal: { price: '' },
	},
	{
		name: 'numberOfInstalments',
		label: 'تعداد اقساط وام :',
		defaultVal: { numberOfInstalments: 0 },
	},
	{
		name: 'numberOfPeople',
		label: 'تعداد افراد وام :',
		defaultVal: { numberOfPeople: 0 },
	},
	{
		name: 'description',
		label: 'مشخصات دیگر :',
		notRequired: true,
		defaultVal: { description: '' },
	},
];
