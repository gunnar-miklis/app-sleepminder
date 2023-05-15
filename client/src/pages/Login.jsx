import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../service/auth.services';
import { AuthContext } from '../context/auth.context';

export default function Login() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState( undefined );
	const { storeToken, authenticateUser } = useContext( AuthContext );

	const [username, setUsername] = useState( '' );
	const handleUsername = ( e ) => setUsername( e.target.value );
	const [password, setPassword] = useState( '' );
	const handlePassword = ( e ) => setPassword( e.target.value );

	function handleLogin( e ) {
		e.preventDefault();
		const reqBody = { username, password };

		authService.login( reqBody )
			.then( ( res ) => {
				console.log( 'JWT token', res.data.authToken );
				storeToken( res.data.authToken ); // COMMENT: token
				authenticateUser();
				navigate( '/dashboard' );
			} )
			.catch( ( err ) => {
				console.log( 'client Login err :>> ', err );
				setErrorMessage( err.res.data.message );
			} );
	}

	return (
		<>
			<h1>Login</h1>

			<form onSubmit={handleLogin}>
				<label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleUsername}
						placeholder='Username'
					/>
				</label>

				<label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handlePassword}
						placeholder='Password'
					/>
				</label>

				<button>Login</button>
			</form>
			{ errorMessage && <p>{errorMessage}</p> }

			<p>Don&#39;t have an account yet?</p>
			<Link to={'/welcome'}> Sign Up</Link>
		</>
	);
}
