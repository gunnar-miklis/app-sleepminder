import { useEffect, useState } from 'react';

export default function Birth( { value, isValid } ) {
	const [birth, setBirth] = useState();
	const [birthIsValid, setBirthIsValid] = useState( isValid );
	const [inputType, setInputType] = useState( 'text' );
	const [today, setToday] = useState( new Date() );

	// different behavior on signup/update
	//	* signup: values are empty / placehoders to guide the user
	//	* update: values are the users specific values
	useEffect( ()=> {
		if ( !value ) return;
		setBirth( value.slice( 0, 10 ) );
	}, [value] );

	function handleBirth( e ) {
		if ( e.target.value ) {
			// if there's an input, border color will change
			setBirth( e.target.value );
			setBirthIsValid( 'valid' );
		} else {
			// reset field
			setBirth();
			setBirthIsValid();
		}
	}

	return (
		<div className='input-wrapper'>

			<p className='p-input'>birth</p>

			<input
				// to display the placeholder, the inital type is "text"
				type={inputType}
				placeholder="Day of birth (dd/mm/yyyy)"
				// onFocus the input type changes to "date"
				onFocus={()=> setInputType( 'date' )}

				// make sure birthday is a date in the past
				min="1900-01-01"
				max={today.toISOString().slice( 0, 10 )}

				value={birth}
				onChange={handleBirth}
				className={birthIsValid}
			/>

		</div>
	);
}
