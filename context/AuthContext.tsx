import { createContext, useContext, useState, useReducer } from 'react';

type User = {
	id: number;
	name: string;
	email: string;
};

type Credentials = {
	email: string;
	password: string;
};

const initialState = {
	user: null,
	isLoggedIn: false,
};

function loginApi(credentials: Credentials): Promise<User> {
	return new Promise((resolve, reject) => {
		const { email, password } = credentials;

		if (!email || !password) reject('Invalid Username or Password');

		if (email !== 'joe@gmail.com' || password !== '123456')
			reject('Invalid Username or Password');

		setTimeout(() => {
			resolve({
				id: 1,
				name: 'Joe Doe',
				email: 'joe@gmail.com',
			});
		}, 1000);
	});
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};

const useAuthContext = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	async function login(credentials: Credentials) {
		try {
			const response = await loginApi(credentials);
			dispatch({ type: 'LOGIN', payload: response });
		} catch (err: any) {
			dispatch({ type: 'LOGOUT' });
			throw new Error(err);
		}
	}

	function logout() {
		dispatch({ type: 'LOGOUT' });
	}

	return {
		state,
		login,
		logout,
	};
};

type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initContextState: UseAuthContextType = {
	state: initialState,
	login: (credentials: Credentials) => Promise.resolve(),
	logout: () => {},
};

export const AuthContext = createContext(initContextState);

export const AuthProvider = ({ children }) => {
	return (
		<AuthContext.Provider value={useAuthContext()}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const { state, login, logout } = useContext(AuthContext);

	return {
		user: state.user,
		isLoggedIn: state.isLoggedIn,
		login,
		logout,
	};
};
