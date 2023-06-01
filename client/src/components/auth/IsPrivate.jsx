import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner';

// DONE: if the user is logged OUT and NOT verfied, they will be redirected to the "login" page
export default function IsPrivate( { children } ) {
	const { isLoggedIn, isLoading } = useContext( AuthContext );

	if ( isLoading ) return <Spinner />;

	if ( !isLoggedIn ) {
		return <Navigate to="/login" />;
	} else {
		return children;
	}
}
