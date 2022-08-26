const p2e = (s: any) =>
	s.replace(/[۰-۹]/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
export const persianDateCreator = (date: string | Date) => {
	const enDate = new Date(date);
	const perDate = Intl.DateTimeFormat('fa-IR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(enDate);

	return p2e(perDate);
};
