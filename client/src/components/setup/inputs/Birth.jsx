import { useState } from 'react';

export default function Birth() {
	// birth
	const [birth, setBirth] = useState();
	const [birthIsValid, setBirthIsValid] = useState();
	const [inputType, setInputType] = useState( 'text' );
	function handleBirth( e ) {
		if ( e.target.value ) {
			setBirth( e.target.value );
			setBirthIsValid( 'valid' );
		} else {
			setBirth();
			setBirthIsValid();
		}
	}
	return (
		<input
			type={inputType}
			onFocus={()=> setInputType( 'date' )}
			value={birth}
			onChange={handleBirth}
			placeholder="Day of birth (dd/mm/yyyy)"
			className={birthIsValid} />
	);
}
