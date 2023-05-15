import { useEffect, useState } from 'react';
import TimeToRelax from './reminder-elements/TimeToRelax';
import StopCoffee from './reminder-elements/StopCoffee';
import StopHeavyMeals from './reminder-elements/StopHeavyMeals';
import StopScreens from './reminder-elements/StopScreens';

// TODO: convert and calculate time and hours
const testTime = '06:00'; // aka (current) 'time'
const coffee = '05:00';
const eating = '02:00';
const screens = '01:00';

export default function ReminderCard( { wakeTime, bedTime } ) {
	// NOTE: current time
	const [time, setTime] = useState( new Date().toISOString().slice( 11 ).slice( 0, 8 ) );
	// update every 1 second
	useEffect( () => {
		setInterval( () => {
			setTime( new Date().toISOString().slice( 11 ).slice( 0, 8 ) );
		}, 1000 );
	}, [] );

	// NOTE: reminder logic
	const [reminder, setReminder] = useState( '' );

	useEffect( () => {
		if ( testTime <= wakeTime || testTime >= bedTime ) {
			setReminder( 'relax' );
		} else if ( testTime >= bedTime - screens ) {
			setReminder( 'stopScreens' );
		} else if ( testTime >= bedTime - eating ) {
			setReminder( 'stopHeavyMeals' );
		} else if ( testTime >= bedTime - coffee ) {
			setReminder( 'stopCoffee' );
		} else {
			setReminder( 'enjoy your day' );
		}
	}, [bedTime, wakeTime] );


	return (
		<div>
			<h3 className="card-header">It&#39;s still time to...</h3>
			<div className="card flex-col-between">
				<br/>
				{ reminder === 'relax' && <TimeToRelax /> }
				{ reminder === 'stopScreens' && <StopScreens /> }
				{ reminder === 'stopHeavyMeals' && <StopHeavyMeals /> }
				{ reminder === 'stopCoffee' && <StopCoffee /> }

				<br/>
				<br/>
				<h1 style={{ 'color': '#BB86FC', 'fontWeight': '900' }}>{time && time}</h1>
				<h1><strong>{reminder && reminder}</strong></h1>
				<br/>
				<h2>wake time: {wakeTime}</h2>
				<h2>bed time: {bedTime}</h2>
				<h2>testing time: {testTime}</h2>

				<br/>
			</div>
		</div>
	);
}
