import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import Sidebar from './sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative">
			{open ? (
				<div className={`w-52 fixed top-0`}>
					<Sidebar setOpen={setOpen} />
					<div
						className="absolute top-2 left-2 text-xl text-white"
						onClick={() => setOpen(!open)}>
						<AiFillCloseCircle />
					</div>
				</div>
			) : null}
			<FaBars
				className={`mr-2 text-lg mt-2 ${open ? 'hidden' : null}`}
				onClick={() => setOpen(!open)}
			/>
			<div onClick={() => setOpen(false)}>{children}</div>
		</div>
	);
};

export default Layout;
