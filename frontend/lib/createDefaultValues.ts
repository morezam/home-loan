import { FieldData } from '../types/fieldData';

export const createDefaultValues = (fieldData: FieldData[]) => {
	return fieldData
		.map(data => data.defaultVal)
		.reduce((result, item) => {
			let key = Object.keys(item)[0];
			result[key] = item[key];
			return result;
		}, {});
};
