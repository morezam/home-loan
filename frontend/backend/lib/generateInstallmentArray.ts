import { addOneToMonth } from './addOneToMonth';

interface installmentArrayArgs {
	date: string;
	numberOfInstalments: number;
	price: string;
}

export const generateInstallmentArray = async (data: installmentArrayArgs) => {
	let start = data.date;
	const returned = [];
	for (let i = 0; i < data.numberOfInstalments; i++) {
		const newDate = addOneToMonth(start);
		const price = +data.price / data.numberOfInstalments;
		returned.push({ date: newDate, price, paid: false });
		start = newDate;
	}
	return returned;
};
