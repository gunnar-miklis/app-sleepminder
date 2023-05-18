import './StepTwo.css';
import WakeTime from './inputs/WakeTime';

export default function StepTwo( { user, handleStepTwoSubmit, goPreviousStep } ) {
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
				<form onSubmit={handleStepTwoSubmit} className='flex-col-between flex-align-center gap-md'>

					<WakeTime value={user.wakeTime} isValid={ user.wakeTime && 'valid'} />

					<br/>
					<button className="btn-sm">Next</button>
					<button className='btn-skip' onClick={()=>goPreviousStep( 1 )}>Back</button>
				</form>
			</div>

		</div>
	);
}
