import { useEffect, useState } from 'react';

export default function Height( { value, isValid } ) {
	const [height, setHeight] = useState();
	const [heightIsValid, setHeightIsValid] = useState( isValid );

	// different behavior on signup/update
	//	* signup: values are empty / placehoders to guide the user
	//	* update: values are the users specific values
	useEffect( ()=> {
		if ( !value ) return;
		setHeight( value );
	}, [value] );

	function handleHeight( e ) {
		// prevent negativ numbers
		if ( e.target.value < 0 ) setHeight( false );
		else {
			if ( e.target.value ) {
				// if there's an input, border color will change
				setHeight( e.target.value );
				setHeightIsValid( 'valid' );
			} else {
				// reset field
				setHeight();
				setHeightIsValid();
			}
		}
	}
	return (
		<div className='input-wrapper'>

			<p className='p-input'>height</p>

			<input
				type="number"
				value={height}
				onChange={handleHeight}
				placeholder="Height (cm)"
				className={heightIsValid}
			/>

		</div>
	);
}
