import React, {
	createContext,
	useMemo,
	useContext,
	useReducer,
	Dispatch,
	useEffect,
} from 'react';

import { Auth, AuthActionKind, AuthReducer, initialState } from './authReducer';

const AuthContext = createContext<{ state: Auth; dispatch: Dispatch<any> }>({
	state: initialState,
	dispatch: () => {},
});

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		const token = localStorage.getItem('token');
		token &&
			dispatch({
				type: AuthActionKind.LOGIN,
				payload: token,
			});
	}, []);

	useEffect(() => {
		state.token !== null
			? localStorage.setItem('token', state.token)
			: localStorage.removeItem('token');
	}, [state.token]);

	const contextValue = useMemo(() => {
		return { state, dispatch };
	}, [state, dispatch]);
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
