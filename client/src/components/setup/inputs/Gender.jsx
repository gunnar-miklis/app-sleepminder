import { useEffect, useState } from 'react';

export default function Gender( { value, isValid } ) {
	const [gender, setGender] = useState( 'What best describes your gender?' );
	const [genderIsValid, setGenderIsValid] = useState( isValid );

	// different behavior on signup/update
	//	* signup: values are empty / placehoders to guide the user
	//	* update: values are the users specific values
	useEffect( ()=> {
		if ( !value ) return;
		setGender( value );
	}, [value] );

	function handleGender( e ) {
		// make sure it's not the default option, despite html property "disabled" is set
		if ( e.target.value && e.target.value !== 'What best describes your gender?' ) {
			// if there's an input, border color will change
			setGender( e.target.value );
			setGenderIsValid( 'valid' );
		} else {
			// reset field
			setGender();
			setGenderIsValid();
		}
	}

	return (
		<div className='input-wrapper'>

			<p className='p-input'>gender</p>

			<select onChange={handleGender} className={genderIsValid} >
				{/* 'What best describes your gender?' is disabled, but is also used as a placeholer in the signup to guide the user */}
				{ gender === 'What best describes your gender?' ? <option value='What best describes your gender?' selected disabled>What best describes your gender?</option> : <option value='What best describes your gender?' disabled>What best describes your gender?</option> }
				{ gender === 'female' ? <option value='female' selected >female</option> : <option value='female'>female</option> }
				{ gender === 'male' ? <option value='male' selected >male</option> : <option value='male'>male</option> }
				{ gender === 'diverse' ? <option value='diverse' selected >diverse</option> : <option value='diverse'>diverse</option> }
			</select>

		</div>
	);
}
