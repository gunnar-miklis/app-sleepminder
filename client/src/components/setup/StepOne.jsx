import './StepOne.css';
import Avatar from '../Avatar';
import Username from './inputs/Username';
import Password from './inputs/Password';
import Gender from './inputs/Gender';
import Birth from './inputs/Birth';
import Weight from './inputs/Weight';
import Height from './inputs/Height';

export default function StepOne( { handleStepOneSubmit } ) {
	return (
		<>
			<h1>Set your profile</h1>

			<Avatar />

			<form onSubmit={handleStepOneSubmit} className='flex-col-between flex-align-center gap-md'>
				<Username />

				<Password />

				<Birth />

				<Gender />

				<Weight />

				<Height />

				<button type='submit' className="btn-sm">Next</button>
			</form>

		</>
	);
}
