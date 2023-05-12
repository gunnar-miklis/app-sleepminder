import './Step2.css';
import { useState } from 'react';

function SetupStepTwo( { nextStep, previousStep } ) {
	const [wakeTime, setWakeTime] = useState();
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

	function handleSubmit( e ) {
		return;
	}

	return (
		<>

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
				<form onSubmit={handleSubmit}>
					<input
						type="time"
						value={wakeTime}
						onChange={handleWakeTime}
						placeholder="wake up time"
						className={wakeTimeIsValid}
					/>
				</form>
			</div>

			<br/>

			<div className="btn-wrapper">

				<button onClick={()=>previousStep( 1 )} className="btn-skip">Back</button>
				<button onClick={()=>nextStep( 3 )} className="btn-sm">Next</button>
			</div>

		</>
	);
}

export default SetupStepTwo;
