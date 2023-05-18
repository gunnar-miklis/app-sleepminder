import { useState } from 'react';

export default function Password( isValid ) {
	const [password, setPassword] = useState();
	const [passwordIsValid, setPasswordIsValid] = useState( isValid );

	function handlePassword( e ) {
		if ( e.target.value ) {
			setPassword( e.target.value );
			setPasswordIsValid( 'valid' );
		} else {
			setPassword();
			setPasswordIsValid();
		}
	}
	// password live check
	// const [pwDigit, setPwDigit] = useState( '' );
	// const [pwLower, setPwLower] = useState( '' );
	// const [pwUpper, setPwUpper] = useState( '' );
	// const [pwLength, setPwLength] = useState( '' );
	// const pwRegExDigit = /(?=.*\d)/;
	// const pwRegExLower = /(?=.*[a-z])/;
	// const pwRegExUpper = /(?=.*[A-Z])/;
	// const pwRegExLength = /(?=.*).{6,}/;
	// if ( pwRegExDigit.test( password ) ) {
	// 	setPwDigit( 'checked' );
	// }
	// if ( pwRegExLower.test( password ) ) {
	// 	setPwLower( 'checked' );
	// }
	// if ( pwRegExUpper.test( password ) ) {
	// 	setPwUpper( 'checked' );
	// }
	// if ( pwRegExLength.test( password ) ) {
	// 	setPwLength( 'checked' );
	// }
	return (
		<div className='input-wrapper'>
			<p className='p-input'>password</p>
			<input
				type="password"
				value={password}
				onChange={handlePassword}
				placeholder="Password"
				className={passwordIsValid} />
			{/* <ul>
				<li className={pwLower}>lowercase</li>
				<li className={pwUpper}>UPPERCASE</li>
				<li className={pwDigit}>Number123</li>
				<li className={pwLength}>Length: 6+</li>
			</ul> */}
		</div>
	);
}
