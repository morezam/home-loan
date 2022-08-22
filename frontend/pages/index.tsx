import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const WelcomeBack = () => {
	return (
		<div
			className="relative h-screen bg-background"
			style={{
				borderBottomLeftRadius: '50% 10%',
				borderBottomRightRadius: '50% 10%',
			}}>
			<Head>
				<title>صندوق قرض الحسنه خانگی ونداده</title>
			</Head>
			<div className="relative flex flex-col items-center md:flex-row md:justify-between">
				<div className="flex flex-col justify-center items-center mt-9 text-center sm:w-4/5 md:w-2/5 md:mr-20 ">
					<h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-6xl">
						وام خانگی خود را به راحت ترین شکل ممکن مدیریت کنید.
					</h1>
					<p className="my-7 text-lg text-slate-500">
						{' '}
						با انتخاب این سایت می توانید به راحتی اعضای صندوق را اضافه کنید و با
						انتخاب نوع وام برای آنها قسط بسازید.
					</p>
					<div className="flex flex-col justify-between h-32 items-center md:w-64 md:h-0 md:flex-row lg:w-72">
						<Link href="/signup">
							<a className="bg-primary py-4 px-6 rounded-2xl shadow transition duration-300 hover:bg-secondary hover:text-black  active:translate-y-1 active:shadow-lg">
								عضو شوید
							</a>
						</Link>
						<Link href="/login">
							<a className="bg-secondary py-4 px-6 rounded-2xl shadow active:translate-y-1 active:shadow-lg">
								حساب دارید؟
							</a>
						</Link>
					</div>
				</div>
				<div>
					<Image
						src={'/main-svg.svg'}
						alt="Main Background image"
						width={700}
						height={700}
					/>
				</div>
			</div>
		</div>
	);
};
export default WelcomeBack;
