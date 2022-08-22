const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
const persianDateCreator = date => {
	const enDate = new Date(date);
	const perDate = Intl.DateTimeFormat('fa-IR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(enDate);

	return p2e(perDate);
};

module.exports = persianDateCreator;
