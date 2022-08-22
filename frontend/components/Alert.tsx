const Alert = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-screen h-screen flex justify-center items-center text-xl ">
			{children}
		</div>
	);
};

export default Alert;
