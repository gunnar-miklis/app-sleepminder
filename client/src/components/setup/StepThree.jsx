import SleepTips from './inputs/SleepTips';

export default function StepThree( { handleStepThreeSubmit } ) {
	return (
		<>

			<div>
				<h1>Get sleep tips that fit you</h1>
				<p>Understanding what helps you fall asleep by checking the matching options.</p>
			</div>

			<form onSubmit={handleStepThreeSubmit} className='flex-col-between flex-align-center gap-md'>

				<SleepTips />

				<br/>
				<button className="btn-sm">Next</button>
			</form>


		</>
	);
}
