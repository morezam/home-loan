export const Table = ({ children }: { children: React.ReactNode }) => {
	return (
		<table className="border-black overflow-x-auto max-w-xlg block">
			{children}
		</table>
	);
};

export const TableData = ({
	children,
	noWrap,
}: {
	children: React.ReactNode;
	noWrap?: boolean;
}) => {
	return (
		<td
			className={`${
				noWrap ? 'whitespace-nowrap' : null
			} border-2 text-center border-black px-2 py-1`}>
			{children}
		</td>
	);
};
