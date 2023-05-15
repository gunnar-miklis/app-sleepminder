import React, { useState, useEffect } from 'react';
import authService from './../service/auth.services';
const AuthContext = React.createContext();

function AuthProviderWrapper( props ) {
	const [isLoggedIn, setIsLoggedIn] = useState( false );
	const [user, setUser] = useState( null );

	const [isLoading, setIsLoading] = useState( false );

	function storeToken( token ) {
		localStorage.setItem( 'authToken', token );
	}

	function authenticateUser() {
		const storedToken = localStorage.getItem( 'authToken' );

		if ( storedToken ) {
			authService.verify()
				.then( ( res ) => {
					const user = res.data;
					setIsLoggedIn( true );
					setIsLoading( false );
					setUser( user );
				} )
				.catch( ( err ) => {
					setIsLoggedIn( false );
					setIsLoading( false );
					setUser( null );
				} );
		} else {
			setIsLoggedIn( false );
			setIsLoading( false );
			setUser( null );
		}
	}

	function removeToken() {
		localStorage.removeItem( 'authToken' );
	}

	function logOutUser() {
		removeToken();
		authenticateUser();
	}

	useEffect( () => {
		authenticateUser();
	}, [] );

	return (
		<AuthContext.Provider value={ { isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
