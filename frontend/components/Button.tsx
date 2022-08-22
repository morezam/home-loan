import { MouseEventHandler } from 'react';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	bg?: string;
	textColor?: string;
	hoverBg?: string;
	hoverText?: string;
}

const Button = ({
	children,
	bg,
	textColor,
	hoverBg,
	hoverText,
	onClick,
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`${bg ? bg : 'bg-primary'} m-1 rounded-md py-2 px-3 ${
				textColor ? textColor : 'text-slate-50'
			} active:translate-y-1 active:shadow-2xl hover:${
				hoverBg ? hoverBg : 'bg-secondary'
			} hover:${hoverText ? hoverText : 'text-black'} transition duration-200`}>
			{children}
		</button>
	);
};

export default Button;
