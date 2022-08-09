import { Reducer, ReducerStateWithoutAction } from 'react';

export enum AuthActionKind {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}

export interface Auth {
	isAuthenticated: boolean;
	token: string | null;
}

interface Action {
	type: AuthActionKind;
	payload: string | null;
}

export const initialState = {
	isAuthenticated: false,
	token: null,
};

export const AuthReducer = (state: Auth, action: Action) => {
	switch (action.type) {
		case AuthActionKind.LOGIN: {
			return {
				...state,
				isAuthenticated: true,
				token: action.payload,
			};
		}
		case AuthActionKind.LOGOUT: {
			return {
				...state,
				isAuthenticated: false,
				token: action.payload,
			};
		}
		default:
			return state;
	}
};
