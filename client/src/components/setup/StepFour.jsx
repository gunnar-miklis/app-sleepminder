import './StepFour.css';
import Caffeine from './inputs/Caffeine';
import Alcohol from './inputs/Alcohol';

export default function StepFour( { handleStepFourSubmit, errorMessage } ) {
	return (
		<>

			<div>
				<br/>
				<h1>Get a customized daily routine</h1>
				<p>Select what you usually drink by checking the matching options.</p>
				<br/>
			</div>

			<form onSubmit={handleStepFourSubmit} className='flex-col-between flex-align-center gap-lg'>

				<Caffeine />

				<Alcohol />

				<br/>

				{ errorMessage && <p className="error">{errorMessage}</p> }

				<button className="btn-sm">Done</button>
			</form>


		</>
	);
}
