import { useState } from 'react';

export default function Height() {
	// height
	const [height, setHeight] = useState();
	const [heightIsValid, setHeightIsValid] = useState();
	function handleHeight( e ) {
		if ( e.target.value < 0 ) setHeight( false );
		else {
			if ( e.target.value ) {
				setHeight( e.target.value );
				setHeightIsValid( 'valid' );
			} else {
				setHeight();
				setHeightIsValid();
			}
		}
	}
	return (
		<input
			type="number"
			value={height}
			onChange={handleHeight}
			placeholder="Height (cm)"
			className={heightIsValid} />
	);
}
