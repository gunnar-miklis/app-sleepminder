import { useEffect, useState } from 'react';

export default function WakeTime( { value, isValid } ) {
	const [wakeTime, setWakeTime] = useState( '' );
	const [wakeTimeIsValid, setWakeTimeIsValid] = useState( isValid );

	useEffect( ()=> {
		if ( !value ) return;
		setWakeTime( value );
	}, [value] );

	function handleWakeTime( e ) {
		if ( e.target.value ) {
			setWakeTime( e.target.value );
			setWakeTimeIsValid( 'valid' );
		} else {
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
