import { useEffect, useState } from 'react';

export default function Weight( { value, isValid } ) {
	const [weight, setWeight] = useState();
	const [weightIsValid, setWeightIsValid] = useState( isValid );

	// different behavior on signup/update
	//	* signup: values are empty / placehoders to guide the user
	//	* update: values are the users specific values
	useEffect( ()=> {
		if ( !value ) return;
		setWeight( value );
	}, [value] );

	function handleWeight( e ) {
		// prevent negativ numbers
		if ( e.target.value < 0 ) setWeight( false );
		else {
			if ( e.target.value ) {
				// if there's an input, border color will change
				setWeight( e.target.value );
				setWeightIsValid( 'valid' );
			} else {
				// reset field
				setWeight();
				setWeightIsValid();
			}
		}
	}

	return (
		<div className='input-wrapper'>

			<p className='p-input'>weight</p>

			<input
				type="number"
				value={weight}
				onChange={handleWeight}
				placeholder="Weight (kg)"
				className={weightIsValid}
			/>

		</div>
	);
}
