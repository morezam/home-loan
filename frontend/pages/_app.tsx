import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryclient';
import { AuthContextProvider } from '../context/authContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</AuthContextProvider>
	);
}

export default MyApp;
