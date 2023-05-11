import './Avatar.css';
import avatar from './../../assets/avatar.png';

function Avatar() {
	return (
		<div className='avatar'>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="10" cy="10" r="9.5" fill="#262134" stroke="#F5F2FF"/>
				<path d="M11.9062 5.37495L10.7344 6.54683L13.0781 8.89058L14.25 7.7187L11.9062 5.37495ZM9.5625 7.7187L4.875 12.4062V14.75H7.21875L11.9062 10.0625L9.5625 7.7187Z" fill="#F5F2FF"/>
			</svg>
			<img src={avatar} alt="img-avatar" />
		</div>
	)
}

export default Avatar;