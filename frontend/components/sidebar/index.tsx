import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthContext } from '../../context/authContext';
import { AuthActionKind } from '../../context/authReducer';
import { sideArray } from './sidebarItems';
import { MdOutlineLogout } from 'react-icons/md';
import { Dispatch, SetStateAction } from 'react';

interface SideBarProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setOpen }: SideBarProps) => {
	const router = useRouter();
	const { dispatch } = useAuthContext();

	return (
		<ul
			className={`list-none relative flex flex-col bg-sidebar h-screen text-slate-100`}>
			{sideArray.map((item, i) => {
				return (
					<li
						key={i}
						onClick={() => setOpen(false)}
						className="py-3 hover:bg-primary transition duration-150">
						<Link href={item.url}>
							<a className="flex items-center ">
								{<item.icon />} <span className="mr-3">{item.title}</span>
							</a>
						</Link>
					</li>
				);
			})}
			<li onClick={() => setOpen(false)} className="mt-10 text-center py-2">
				<Link href="/login">
					<a
						className="py-2 px-3 text-slate-50 active:translate-y-1 active:shadow-2xl hover:bg-secondary hover:text-black transition duration-200 flex items-center"
						onClick={() => {
							dispatch({
								type: AuthActionKind.LOGOUT,
								payload: null,
							});
							router.push('/login');
						}}>
						<MdOutlineLogout className="ml-2" /> خروج از حساب
					</a>
				</Link>
			</li>
		</ul>
	);
};

export default Sidebar;
