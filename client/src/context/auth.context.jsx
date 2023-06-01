import apiService from '../service/api.services';
import React, { useState, useEffect } from 'react';

// create a context
const AuthContext = React.createContext();

function AuthProviderWrapper( props ) {
	const [user, setUser] = useState( null );
	const [isLoggedIn, setIsLoggedIn] = useState( false );
	const [isLoading, setIsLoading] = useState( true );

	// store token in local storage
	function storeToken( token ) {
		localStorage.setItem( 'authToken', token );
	}

	// DONE: verify user via api
	function authenticateUser() {
		// get stored token from local storage
		const storedToken = localStorage.getItem( 'authToken' );

		if ( storedToken ) {
			apiService.verify()
				.then( ( res ) => {
					// receive: username and id from backend
					const user = res.data;
					setUser( user );

					// login user
					setIsLoggedIn( true );

					setIsLoading( false );
				} )
				.catch( ( err ) => {
					// BUG: when using my own "jwtExpired" middleware.
					//	this method works really great on localhost to delete expired tokens.
					//	but on the deployment server this crashes the app somehow.
					//	maybe, because there are other tokens stored as well?! couldn't figure out in time.
					// if ( err.response.data.error === 'token expired' ) {
					// 	removeToken();
					// }

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

	// remove token from local storage
	function removeToken() {
		localStorage.removeItem( 'authToken' );
	}

	// logout user, remove token and verify user = setUser and setIsLoggedIn to 'false'
	function logOutUser() {
		removeToken();
		authenticateUser();
	}

	// execute once
	useEffect( () => {
		authenticateUser();
	}, [] );

	return (
		<AuthContext.Provider value={ { isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser } }>

			{props.children}

		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
