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
						<div className='flex-row-between flex-align-center gap-sm'>
							<p><strong>67 </strong></p>
							<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M0.5 10.5C0.5 7.84784 1.55357 5.3043 3.42893 3.42893C5.3043 1.55357 7.84784 0.5 10.5 0.5C13.1522 0.5 15.6957 1.55357 17.5711 3.42893C19.4464 5.3043 20.5 7.84784 20.5 10.5C20.5 13.1522 19.4464 15.6957 17.5711 17.5711C15.6957 19.4464 13.1522 20.5 10.5 20.5C7.84784 20.5 5.3043 19.4464 3.42893 17.5711C1.55357 15.6957 0.5 13.1522 0.5 10.5ZM5.83333 8.5H7.16667V7.16667H5.83333V8.5ZM13.8333 8.5H15.1667V7.16667H13.8333V8.5ZM7.03333 12.1C7.43697 12.6382 7.96037 13.075 8.56207 13.3759C9.16378 13.6767 9.82727 13.8333 10.5 13.8333C11.1727 13.8333 11.8362 13.6767 12.4379 13.3759C13.0396 13.075 13.563 12.6382 13.9667 12.1L15.0333 12.9C12.7667 15.9227 8.23333 15.9227 5.96667 12.9L7.03333 12.1Z" fill="#BB86FC"/>
							</svg>
						</div>
						<p className="p-sm">Great Nights</p>
					</div>
					<div style={{ 'borderLeft': '1px solid gray' }}></div>
					<div className='flex-col-between flex-align-center'>
						<p><strong>4 nights</strong></p>
						<p className="p-sm">Longest streak </p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserLgCard;
