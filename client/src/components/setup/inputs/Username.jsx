import { useState } from 'react';

export default function Username() {
	// username
	const [username, setUsername] = useState();
	const [nameIsValid, setNameIsValid] = useState();
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
		<input
			type="text"
			value={username}
			onChange={handleUsername}
			placeholder="Username"
			className={nameIsValid}
		/>
	);
}
