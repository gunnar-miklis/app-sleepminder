import './UserCard.css';
import Avatar from '../Avatar';

function UserLgCard() {
	return (
		<div className='user-card'>
			<div className="card flex-col-center gap-sm">
				<Avatar />
				<h1>Christina Schmidt</h1>
				<div className='flex-row-center gap-md'>
					<div className='flex-col-between flex-align-center'>
						<p><strong>67 🙂</strong></p>
						<p>Great Nights</p>
					</div>
					<div style={{ 'borderLeft': '1px solid gray' }}></div>
					<div className='flex-col-between flex-align-center'>
						<p><strong>4 nights</strong></p>
						<p>Longest streak </p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserLgCard;
