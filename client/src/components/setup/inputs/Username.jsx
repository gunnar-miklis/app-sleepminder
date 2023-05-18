import { useEffect, useState } from 'react';

export default function Username( { value, isValid } ) {
	const [username, setUsername] = useState();
	const [nameIsValid, setNameIsValid] = useState( isValid );

	useEffect( ()=> {
		if ( !value ) return;
		setUsername( value );
	}, [value] );

	function handleUsername( e ) {
		if ( e.target.value ) {
			setUsername( e.target.value );
			setNameIsValid( 'valid' );
		} else {
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
