import { Link } from 'react-router-dom';
import './setup.css';
import { useState } from 'react';

function SetupStepTwo() {
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
		<div className="setup">

			<div className="step-progress-bar">
				<div></div>
				<div className="active" data-step="Step 2"></div>
				<div></div>
				<div></div>
			</div>

			<div>
				<br/>
				<h1>Get a customized daily routine</h1>
				<p>Allow access to the alarm on your phone and the app will plan your day.</p>
				<br/>
				<label className='switch'>
					<input type="checkbox" className='toggle'/>
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

			<div className='btn-wrapper'>
				<Link to="/setup/step-1" className="btn-skip">Skip</Link>
				<Link to="/setup/step-3" className="btn-sm">Next</Link>
			</div>

		</div>
	);
}

export default SetupStepTwo;
