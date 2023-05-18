import { useEffect, useState } from 'react';

export default function Gender( { value, isValid } ) {
	const [gender, setGender] = useState( 'What best describes your gender?' );
	const [genderIsValid, setGenderIsValid] = useState( isValid );

	useEffect( ()=> {
		if ( !value ) return;
		setGender( value );
	}, [value] );

	function handleGender( e ) {
		if ( e.target.value && e.target.value !== 'What best describes your gender?' ) {
			setGender( e.target.value );
			setGenderIsValid( 'valid' );
		} else {
			setGender();
			setGenderIsValid();
		}
	}
	return (
		<div className='input-wrapper'>
			<p className='p-input'>gender</p>
			<select
				onChange={handleGender}
				className={genderIsValid}>
				{ gender === 'What best describes your gender?' ? <option value='What best describes your gender?' selected disabled>What best describes your gender?</option> : <option value='What best describes your gender?' disabled>What best describes your gender?</option> }
				{ gender === 'female' ? <option value='female' selected >female</option> : <option value='female'>female</option> }
				{ gender === 'male' ? <option value='male' selected >male</option> : <option value='male'>male</option> }
				{ gender === 'diverse' ? <option value='diverse' selected >diverse</option> : <option value='diverse'>diverse</option> }
			</select>
		</div>
	);
}
