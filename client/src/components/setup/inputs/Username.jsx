import { useEffect, useState } from 'react';

export default function Username( { value, isValid } ) {
	const [username, setUsername] = useState();
	const [nameIsValid, setNameIsValid] = useState( isValid );

	// different behavior on signup/update
	//	* signup: values are empty / placehoders to guide the user
	//	* update: values are the users specific values
	useEffect( ()=> {
		if ( !value ) return;
		setUsername( value );
	}, [value] );

	function handleUsername( e ) {
		if ( e.target.value ) {
			// if there's an input, border color will change
			setUsername( e.target.value );
			setNameIsValid( 'valid' );
		} else {
			// reset field
			setUsername();
			setNameIsValid();
		}
	}

	return (
		<div className='input-wrapper'>

			<p className='p-input'>username</p>

			<input
				type="text"
				value={username}
				onChange={handleUsername}
				placeholder="Username"
				className={nameIsValid}
			/>

		</div>
	);
}
