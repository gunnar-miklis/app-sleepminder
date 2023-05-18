import { useEffect, useState } from 'react';

export default function Birth( { value, isValid } ) {
	const [birth, setBirth] = useState();
	const [birthIsValid, setBirthIsValid] = useState( isValid );
	const [inputType, setInputType] = useState( 'text' );

	useEffect( ()=> {
		if ( !value ) return;

		setBirth( value.slice( 0, 10 ) );
	}, [value] );

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
		<div className='input-wrapper'>
			<p className='p-input'>birth</p>
			<input
				type={inputType}
				onFocus={()=> setInputType( 'date' )}
				value={birth}
				onChange={handleBirth}
				placeholder="Day of birth (dd/mm/yyyy)"
				className={birthIsValid} />

		</div>
	);
}
