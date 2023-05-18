import { useEffect, useState } from 'react';

export default function Weight( { value, isValid } ) {
	const [weight, setWeight] = useState();
	const [weightIsValid, setWeightIsValid] = useState( isValid );

	useEffect( ()=> {
		if ( !value ) return;
		setWeight( value );
	}, [value] );

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
		<div className='input-wrapper'>
			<p className='p-input'>weight</p>
			<input
				type="number"
				value={weight}
				onChange={handleWeight}
				placeholder="Weight (kg)"
				className={weightIsValid} />
		</div>
	);
}
