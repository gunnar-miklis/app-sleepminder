import SleepTips from './inputs/SleepTips';

export default function StepThree( { user, handleStepThreeSubmit, goPreviousStep } ) {
	return (
		<>

			<div>
				<h1>Get sleep tips that fit you</h1>
				<p>Understanding what helps you fall asleep by checking the matching options.</p>
			</div>

			<form onSubmit={handleStepThreeSubmit} className='flex-col-between flex-align-center gap-md'>

				<SleepTips value={user.sleepTips} />

				<br/>
				<button className="btn-sm">Next</button>
				<button className='btn-skip' onClick={()=>goPreviousStep( 2 )}>Back</button>
			</form>


		</>
	);
}
