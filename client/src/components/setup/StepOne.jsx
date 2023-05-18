import './StepOne.css';
import Avatar from '../Avatar';
import Username from './inputs/Username';
import Password from './inputs/Password';
import Gender from './inputs/Gender';
import Birth from './inputs/Birth';
import Weight from './inputs/Weight';
import Height from './inputs/Height';

export default function StepOne( { user, handleStepOneSubmit } ) {
	return (
		<>
			<h1>Set your profile</h1>

			<Avatar />

			<form onSubmit={handleStepOneSubmit} className='flex-col-between flex-align-center gap-md'>
				<Username value={user.username} isValid={ user.username && 'valid'}/>

				<Password value={user.password} isValid={ user.password && 'valid'} />

				<Birth value={user.birth} isValid={ user.birth && 'valid'}/>

				<Gender value={user.gender} isValid={ user.gender && 'valid'} />

				<Weight value={user.weight} isValid={ user.weight && 'valid'} />

				<Height value={user.height} isValid={ user.height && 'valid'} />

				<br/>
				<button type='submit' className="btn-sm">Next</button>
			</form>

		</>
	);
}
