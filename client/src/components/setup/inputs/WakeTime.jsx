import { useEffect, useState } from 'react';

export default function WakeTime( { value, isValid } ) {
	const [wakeTime, setWakeTime] = useState( '' );
	const [wakeTimeIsValid, setWakeTimeIsValid] = useState( isValid );

	// different behavior on signup/update
	//	* signup: values are empty / placehoders to guide the user
	//	* update: values are the users specific values
	useEffect( ()=> {
		if ( !value ) return;
		setWakeTime( value );
	}, [value] );

	function handleWakeTime( e ) {
		if ( e.target.value ) {
			// if there's an input, border color will change
			setWakeTime( e.target.value );
			setWakeTimeIsValid( 'valid' );
		} else {
			// reset field
			setWakeTime();
			setWakeTimeIsValid();
		}
	}

	return (
		<div className='input-wrapper'>

			<p className='p-input'>wake time</p>

			<input
				type="time"
				value={wakeTime}
				onChange={handleWakeTime}
				placeholder="wake up time"
				className={wakeTimeIsValid}
			/>

		</div>
	);
}
