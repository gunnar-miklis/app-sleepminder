import { useState } from 'react';

export default function Weight() {
	// weight
	const [weight, setWeight] = useState();
	const [weightIsValid, setWeightIsValid] = useState();
	function handleWeight( e ) {
		if ( e.target.value < 0 ) setWeight( false );
		else {
			if ( e.target.value ) {
				setWeight( e.target.value );
				setWeightIsValid( 'valid' );
			} else {
				setWeight();
				setWeightIsValid();
			}
		}
	}
	return (
		<input
			type="number"
			value={weight}
			onChange={handleWeight}
			placeholder="Weight (kg)"
			className={weightIsValid} />
	);
}
