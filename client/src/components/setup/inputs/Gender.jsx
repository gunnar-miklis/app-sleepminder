import { useState } from 'react';

export default function Gender() {
	// gender
	const genders = ['What best describes your gender?', 'female', 'male', 'diverse'];
	const [gender, setGender] = useState( genders[0] );
	const [genderIsValid, setGenderIsValid] = useState();
	function handleGender( e ) {
		if ( e.target.value && e.target.value !== genders[0] ) {
			setGender( e.target.value );
			setGenderIsValid( 'valid' );
		} else {
			setGender();
			setGenderIsValid();
		}
	}
	return (
		<select
			onChange={handleGender}
			className={genderIsValid}>
			{
				genders.map( ( value, i ) => {
					if ( i === 0 ) {
						return <option value={value} key={value} disabled selected>{value}</option>;
					}
					return <option value={value} key={value}>{value}</option>;
				} )
			}
		</select>
	);
}
