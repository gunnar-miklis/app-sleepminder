import './StepTwo.css';
import { useState } from 'react';

export default function StepTwo( { handleStepTwoSubmit } ) {
	const [wakeTime, setWakeTime] = useState( '' );
	const [wakeTimeIsValid, setWakeTimeIsValid] = useState();

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
		<div className='flex-col-between flex-align-center gap-md'>

			<div>
				<br/>
				<h1>Get a customized daily routine</h1>
				<p>Allow access to the alarm on your phone and the app will plan your day.</p>
				<br/>
				<label className="switch">
					<input type="checkbox" className="toggle"/>
					<span className="slider round"></span>
				</label>
			</div>

			<div>
				<p>or set your wakeup time manually.</p>
				<form onSubmit={handleStepTwoSubmit} className='flex-col-between flex-align-center gap-lg'>
					<label>
						<input
							type="time"
							value={wakeTime}
							onChange={handleWakeTime}
							placeholder="wake up time"
							className={wakeTimeIsValid}
						/>
					</label>

					<br/>

					<button className="btn-sm">Next</button>
				</form>
			</div>

		</div>
	);
}
