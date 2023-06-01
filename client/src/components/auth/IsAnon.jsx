import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner';

// DONE: if the user is logged IN and verfied, they can access all protected routes, like "dashboard"
export default function IsAnon( { children } ) {
	const { isLoggedIn, isLoading } = useContext( AuthContext );

	if ( isLoading ) return <Spinner />;

	if ( isLoggedIn ) {
		return <Navigate to="/dashboard" />;
	} else {
		return children;
	}
}
