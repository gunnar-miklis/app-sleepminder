import { useEffect, useState } from 'react';

function ReminderCard() {
	const [reminder, setReminder] = useState( '' );

	const currentTime = new Date().toISOString().slice( 11 ).slice( 0, 2 );
	// currentTime = 22; // TESTING

	const wakeTime = 7;
	const bedTime = 22; // wakeTime - 8;
	const coffeeRange = 5;
	const alcoholRange = 3;
	const eatingRange = 2;
	const screensRange = 1;

	useEffect( () => {
		if ( currentTime <= wakeTime || currentTime >= bedTime ) {
			setReminder( 'sleep' );
		} else if ( currentTime >= bedTime - screensRange ) {
			setReminder( 'stop 💻: 1h before bed' );
		} else if ( currentTime >= bedTime - eatingRange ) {
			setReminder( 'stop 🍕: 2h before bed' );
		} else if ( currentTime >= bedTime - alcoholRange ) {
			setReminder( 'stop 🍷: 3h before bed' );
		} else if ( currentTime >= bedTime - coffeeRange ) {
			setReminder( 'stop ☕: 5h before bed' );
		} else {
			setReminder( 'enjoy your day' );
		}
	}, [] );


	return (
		<>
			<h3 className="card-header">How did you sleep last night?</h3>
			<div className="card flex-col-between">
				<h1>Current time: {currentTime}</h1>
				<h2>Your bed time: {bedTime}h</h2>
				<br/>
				<h3>{reminder && reminder}</h3>
			</div>
		</>
	);
}

export default ReminderCard;
