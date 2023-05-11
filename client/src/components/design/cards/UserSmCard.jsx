import './UserSmCard.css';
import imgAvatar from './../../../assets/avatar.png';

function UserSmCard() {
	return (
		<div className="card flex-justify-start">
			<img src={imgAvatar}></img>
			<h1>Hell Christina!</h1>
		</div>
	);
}

export default UserSmCard;
