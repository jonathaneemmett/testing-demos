import { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';

export default function Home() {
	const { user } = useAuth();

	return <h1>Welcome, {user?.name || 'Guest'}</h1>;
}
