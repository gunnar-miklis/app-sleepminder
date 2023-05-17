import './ReminderCard.css';
import { useEffect, useState } from 'react';
import TimeToRelax from './reminder-elements/TimeToRelax';
import StopCoffee from './reminder-elements/StopCoffee';
import StopHeavyMeals from './reminder-elements/StopHeavyMeals';
import StopScreens from './reminder-elements/StopScreens';
import WakeBedTime from './reminder-elements/WakeBedTime';
import Spinner from '../Spinner';
import Clock from './reminder-elements/Clock';
import EnjoyYourDay from './reminder-elements/EnjoyYourDay';

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

					{ reminder === 'relax' &&
					<div className='flex-col-evenly flex-align-center gap-sm'>
						<div>
							<h3></h3>
							<h3></h3>
							<h3></h3>
						</div>
						<div className='reminder-graphic flex-col-between flex-align-center gap-md'>
							<h1><strong style={{ 'color': '#bb86fc', 'font-size': '1.2em' }}>time to sleep</strong></h1>
							<TimeToRelax />
							<Clock time={time} />
							<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						</div>
					</div>
					}
					{ reminder === 'stopScreens' &&
					<div className='flex-col-between gap-lg'>
						<div>
							<h3><span className="stop">stop</span> drinking coffee ☕</h3>
							<h3><span className="stop">stop</span> eating heavy meals 🍕</h3>
							<h3><span className="stop">stop</span> using screens</h3>
						</div>
						<div className='reminder-graphic flex-col-between flex-align-center gap-md'>
							<h1><strong style={{ 'color': '#bb86fc', 'font-size': '1.2em' }}>time to relax</strong></h1>
							<StopScreens />
							<Clock time={time} />
							<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						</div>
					</div>
					}
					{ reminder === 'stopHeavyMeals' &&
					<div className='flex-col-between gap-lg'>
						<div>
							<h3><span className="stop">stop</span> drinking coffee ☕</h3>
							<h3><span className="stop">stop</span> eating heavy meals 🍕</h3>
							<h3>...use screens 💻</h3>
						</div>
						<div className='reminder-graphic flex-col-between flex-align-center gap-md'>
							<h1><strong style={{ 'color': '#bb86fc', 'font-size': '1.2em' }}>enjoy your day</strong></h1>
							<StopHeavyMeals />
							<Clock time={time} />
							<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						</div>
					</div>
					}
					{ reminder === 'stopCoffee' &&
					<div className='flex-col-between gap-lg'>
						<div>
							<h3><span className="stop">stop</span> drinking coffee ☕</h3>
							<h3>...eat heavy meals 🍕</h3>
							<h3>...use screens 💻</h3>
						</div>
						<div className='reminder-graphic flex-col-between flex-align-center gap-md'>
							<h1><strong style={{ 'color': '#bb86fc', 'font-size': '1.2em' }}>enjoy your day</strong></h1>
							<StopCoffee />
							<Clock time={time} />
							<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						</div>
					</div>
					}
					{ reminder === 'enjoy your day' &&
					<div className='flex-col-between gap-lg'>
						<div>
							<h3>...drink coffee ☕</h3>
							<h3>...eat heavy meals 🍕</h3>
							<h3>...use screens 💻</h3>
						</div>
						<div className='reminder-graphic flex-col-between flex-align-center gap-md'>
							<h1><strong style={{ 'color': '#D9FDED', 'font-size': '1.2em' }}>enjoy your day</strong></h1>
							<EnjoyYourDay />
							<Clock time={time} />
							<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
						</div>
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
