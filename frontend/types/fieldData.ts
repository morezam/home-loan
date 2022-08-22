export interface FieldData {
	name: string;
	label: string;
	defaultVal: {
		[key: string]: string | number;
	};
	notRequired?: boolean;
}
