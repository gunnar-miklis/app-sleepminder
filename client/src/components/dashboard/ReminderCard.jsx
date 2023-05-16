import './ReminderCard.css';
import { useEffect, useState } from 'react';
import TimeToRelax from './reminder-elements/TimeToRelax';
import StopCoffee from './reminder-elements/StopCoffee';
import StopHeavyMeals from './reminder-elements/StopHeavyMeals';
import StopScreens from './reminder-elements/StopScreens';
import WakeBedTime from './reminder-elements/WakeBedTime';

export default function ReminderCard( { time, wakeTime, bedTime } ) {
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
	}, [time] );


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
						<h3><strong>time to relax or sleep</strong></h3>
					</div>
				}
				{ reminder === 'stopScreens' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopScreens />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong>stop using screens</strong></h3>
					</div>
				}
				{ reminder === 'stopHeavyMeals' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopHeavyMeals />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong>stop eating heavy meals</strong></h3>
					</div>
				}
				{ reminder === 'stopCoffee' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopCoffee />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong>stop drinking coffee</strong></h3>
					</div>
				}
				{ reminder === 'enjoy your day' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<StopCoffee />
						<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						<h3><strong>enjoy your day</strong></h3>
					</div>
				}

				<br/>
			</div>
		</>
	);
}
