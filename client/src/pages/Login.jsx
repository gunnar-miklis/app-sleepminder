import apiService from '../service/api.services';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

// components
import Spinner from '../components/Spinner';
import Username from '../components/setup/inputs/Username';
import Password from '../components/setup/inputs/Password';

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState( false );
	const [errorMessage, setErrorMessage] = useState( undefined );
	const { storeToken, authenticateUser } = useContext( AuthContext );

	function handleLogin( e ) {
		e.preventDefault();

		// user input
		const username = e.target[0].value;
		const password = e.target[1].value;
		const reqBody = { username, password };

		// DONE: login user, send user input to the backend via api
		setIsLoading( true );
		apiService.login( reqBody )
			.then( ( res ) => {
				// backend creates jwt token and sends to client. client stores token in local storage
				storeToken( res.data.authToken );
				// user gets verfied by backend via valid token
				authenticateUser();

				// redirect to dashboard page
				navigate( '/dashboard' );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				setErrorMessage( err.response.data.message );
				setIsLoading( false );
			} );
	}

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className="setup flex-col-between flex-align-center gap-md">

				<div className='flex-col-evenly flex-align-center'>
					<h1 className="brand-title"><span>Sleep</span>Minder</h1>
					<svg width="56" height="63" viewBox="0 0 56 63" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M16.408 1.809C16.7239 2.31473 16.8262 2.92518 16.6923 3.50626C16.5584 4.08733 16.1993 4.5915 15.694 4.908L3.69398 12.408C3.18794 12.7243 2.577 12.8266 1.99554 12.6924C1.41409 12.5582 0.909748 12.1985 0.593477 11.6925C0.277207 11.1865 0.17491 10.5755 0.309092 9.99407C0.443275 9.41261 0.802944 8.90827 1.30898 8.592L13.309 1.092C13.8151 0.776339 14.4258 0.674546 15.0069 0.808995C15.588 0.943444 16.092 1.30313 16.408 1.809ZM39.592 1.809C39.7485 1.55811 39.9529 1.34053 40.1935 1.16869C40.4341 0.996852 40.7063 0.87413 40.9944 0.807539C41.2825 0.740949 41.5808 0.731797 41.8725 0.780607C42.1641 0.829417 42.4433 0.935231 42.694 1.092L54.694 8.592C55.2 8.90827 55.5597 9.41261 55.6939 9.99407C55.828 10.5755 55.7257 11.1865 55.4095 11.6925C55.2529 11.9431 55.0485 12.1603 54.8079 12.3319C54.5673 12.5034 54.2953 12.6259 54.0074 12.6924C53.426 12.8266 52.815 12.7243 52.309 12.408L40.309 4.908C39.8031 4.59198 39.4434 4.08803 39.309 3.50692C39.1745 2.92581 39.2763 2.31509 39.592 1.809ZM28 63C31.5457 63 35.0566 62.3016 38.3324 60.9447C41.6082 59.5879 44.5847 57.5991 47.0919 55.0919C49.599 52.5847 51.5878 49.6082 52.9447 46.3325C54.3016 43.0567 55 39.5457 55 36C55 32.4543 54.3016 28.9433 52.9447 25.6675C51.5878 22.3918 49.599 19.4153 47.0919 16.9081C44.5847 14.4009 41.6082 12.4121 38.3324 11.0553C35.0566 9.69838 31.5457 9 28 9C20.8391 9 13.9716 11.8446 8.90809 16.9081C3.84461 21.9716 0.999978 28.8392 0.999978 36C0.999978 43.1608 3.84461 50.0284 8.90809 55.0919C13.9716 60.1554 20.8391 63 28 63ZM19 29.25C18.4032 29.25 17.8309 29.0129 17.409 28.591C16.987 28.169 16.75 27.5967 16.75 27C16.75 26.4033 16.987 25.831 17.409 25.409C17.8309 24.9871 18.4032 24.75 19 24.75H37C37.4447 24.7504 37.8793 24.8826 38.249 25.1298C38.6186 25.3771 38.9067 25.7283 39.0768 26.1392C39.247 26.5501 39.2915 27.0022 39.2049 27.4384C39.1182 27.8746 38.9042 28.2753 38.59 28.59L24.43 42.75H37C37.5967 42.75 38.169 42.9871 38.591 43.409C39.0129 43.831 39.25 44.4033 39.25 45C39.25 45.5967 39.0129 46.169 38.591 46.591C38.169 47.013 37.5967 47.25 37 47.25H19C18.5553 47.2496 18.1206 47.1174 17.751 46.8702C17.3813 46.6229 17.0932 46.2717 16.9231 45.8608C16.753 45.4499 16.7084 44.9978 16.7951 44.5616C16.8817 44.1254 17.0957 43.7247 17.41 43.41L31.57 29.25H19Z" fill="#BB86FC"/>
					</svg>
				</div>

				<div>
					<h1>Login</h1>
					<form onSubmit={handleLogin} className='flex-col-between flex-align-center gap-md'>
						<Username />
						<Password />
						<br/>
						<button type='submit' className="btn-sm">Login</button>
						{ errorMessage && <p className="error">{errorMessage}</p> }
					</form>
				</div>

				<div>
					<p>Don&#39;t have an account yet?</p>
					<Link to={'/welcome'}> Sign Up</Link>
				</div>

			</div>
		);
	}
}
