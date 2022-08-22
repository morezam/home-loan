import { FieldData } from '../types/fieldData';

export const borrowerFieldData: FieldData[] = [
	{
		name: 'firstName',
		label: 'نام :',
		defaultVal: { firstName: '' },
	},
	{
		name: 'lastName',
		label: 'نام خانوادگی :',
		defaultVal: { lastName: '' },
	},
	{
		name: 'nationalCode',
		label: 'کد ملی :',
		defaultVal: { nationalCode: '' },
	},
	{
		name: 'phoneNumber',
		label: 'شماره همراه :',
		defaultVal: { phoneNumber: '' },
	},
	{
		name: 'fatherName',
		label: 'نام پدر :',
		defaultVal: { fatherName: '' },
	},
];
