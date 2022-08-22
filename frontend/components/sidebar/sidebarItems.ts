import { FaHome, FaUserPlus, FaUsers, FaPlusCircle } from 'react-icons/fa';
import { SiBookstack } from 'react-icons/si';

export const sideArray = [
	{
		title: 'صفحه اصلی',
		url: '/dashboard',
		icon: FaHome,
	},
	{
		title: 'افزودن عضو جدید',
		url: '/borrowers/create',
		icon: FaUserPlus,
	},
	{
		title: 'مشاهده تمام اعضا',
		url: '/borrowers',
		icon: FaUsers,
	},
	{
		title: 'افزودن وام جدید',
		url: '/loans/create',
		icon: FaPlusCircle,
	},
	{
		title: 'مشاهده تمام وام ها',
		url: '/loans',
		icon: SiBookstack,
	},
];
