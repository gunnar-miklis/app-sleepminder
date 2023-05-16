import './ReminderCard.css';
import { useEffect, useState } from 'react';
import TimeToRelax from './reminder-elements/TimeToRelax';
import StopCoffee from './reminder-elements/StopCoffee';
import StopHeavyMeals from './reminder-elements/StopHeavyMeals';
import StopScreens from './reminder-elements/StopScreens';
import WakeBedTime from './reminder-elements/WakeBedTime';
import Spinner from '../Spinner';

export default function ReminderCard( { time, wakeTime, bedTime, Testing } ) {
	const [isLoading, setIsLoading] = useState( true );
	// NOTE: reminder logic
	const [reminder, setReminder] = useState( '' );
	useEffect( () => {
		if ( !bedTime || !wakeTime || !time ) return;

		// get bedTime, convert to date
		const wakeTimeDate = new Date();
		let [hh, mm] = wakeTime.split( ':' );
		wakeTimeDate.setHours( hh );
		wakeTimeDate.setMinutes( mm );

		// get wakeTime, convert to date
		const bedTimeDate = new Date();
		[hh, mm] = bedTime.split( ':' );
		bedTimeDate.setHours( hh );
		bedTimeDate.setMinutes( mm );

		// calculation
		if ( time.getHours() < wakeTimeDate.getHours() || time.getHours() >= bedTimeDate.getHours() ) {
			setReminder( 'relax' );
		} else if ( time.getHours() >= bedTimeDate.getHours() - 1 ) {
			setReminder( 'stopScreens' );
		} else if ( time.getHours() >= bedTimeDate.getHours() - 3 ) {
			setReminder( 'stopHeavyMeals' );
		} else if ( time.getHours() >= bedTimeDate.getHours() - 5 ) {
			setReminder( 'stopCoffee' );
		} else {
			setReminder( 'enjoy your day' );
		}

		setIsLoading( false );
	}, [time] );


	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<>
				<h3 className="card-header">It&#39;s still time to...</h3>
				<div className="card flex-col-between">
					<br/>

					<div className='clock flex-col-center flex-align-center gap-sm'>
						<h1>{time && time.toTimeString().slice( 0, 5 )}</h1>
						<p className='p-sm'>{time && time.toDateString()}</p>
					</div>

					{ reminder === 'relax' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<TimeToRelax />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong style={{ 'color': '#bb86fc' }}>time to sleep</strong></h3>
					</div>
					}
					{ reminder === 'stopScreens' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopScreens />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong style={{ 'color': '#bb86fc' }}>time to relax</strong></h3>
						<h3>stop drinking coffee ☕</h3>
						<h3>stop eating heavy meals 🍕</h3>
						<h3>stop using screens</h3>
					</div>
					}
					{ reminder === 'stopHeavyMeals' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopHeavyMeals />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong style={{ 'color': '#bb86fc' }}>enjoy your day</strong></h3>
						<h3>stop drinking coffee ☕</h3>
						<h3>stop eating heavy meals 🍕</h3>
						<h3>there's still time to use screens 💻</h3>
					</div>
					}
					{ reminder === 'stopCoffee' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopCoffee />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong style={{ 'color': '#bb86fc' }}>enjoy your day</strong></h3>
						<h3>stop drinking coffee ☕</h3>
						<h3>there's still time eat heavy meals 🍕</h3>
						<h3>there's still time to use screens 💻</h3>
					</div>
					}
					{ reminder === 'enjoy your day' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopCoffee />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong style={{ 'color': '#bb86fc' }}>enjoy your day</strong></h3>
						<h3>there's still time to drink coffee ☕</h3>
						<h3>there's still time eat heavy meals 🍕</h3>
						<h3>there's still time to use screens 💻</h3>
					</div>
					}

					<br/>
					<form onSubmit={Testing} className='demo flex-row-evenly flex-align-center'>
						<input placeholder='demonstrate time change'/>
						<button>Demo</button>
					</form>
				</div>
			</>
		);
	}
}
