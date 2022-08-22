const addOneToMonth = date => {
	const datearray = date.split('/');
	if (+datearray[1] >= 12) {
		const m = (+datearray[1] + 1) % 12;
		const y = +datearray[0] + 1;
		return `${y}/${m}/${datearray[2]}`;
	}
	const plusOne = `${datearray[0]}/${+datearray[1] + 1}/${datearray[2]}`;
	return plusOne;
};

module.exports = addOneToMonth;
