import { useEffect, useState } from 'react';

export default function Height( { value } ) {
	const [height, setHeight] = useState();
	const [heightIsValid, setHeightIsValid] = useState();

	useEffect( ()=> {
		if ( !value ) return;
		setHeight( value );
	}, [value] );

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
		<div className='input-wrapper'>
			<p className='p-input'>height</p>
			<input
				type="number"
				value={height}
				onChange={handleHeight}
				placeholder="Height (cm)"
				className={heightIsValid} />
		</div>
	);
}
