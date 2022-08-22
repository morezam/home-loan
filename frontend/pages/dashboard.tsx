import Link from 'next/link';
import Layout from '../components/Layout';
import Sidebar from '../components/sidebar';
import { useAuthContext } from '../context/authContext';

const Dashboard = () => {
	const { state } = useAuthContext();

	if (!state.token) {
		return (
			<div>
				<Link href="/signup">
					<a>Sign up</a>
				</Link>{' '}
				or{' '}
				<Link href="/login">
					<a>Login</a>
				</Link>{' '}
				first
			</div>
		);
	}
	return (
		<Layout>
			<h1 className="text-2xl">سلام ، به پنل کاربری خود خوش آمدید.</h1>
		</Layout>
	);
};

export default Dashboard;
