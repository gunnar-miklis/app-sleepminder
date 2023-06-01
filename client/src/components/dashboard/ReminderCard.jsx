import './ReminderCard.css';
import { useEffect, useState } from 'react';

// components
import Spinner from '../Spinner';
import Clock from './reminder-elements/Clock';
import WakeBedTime from './reminder-elements/WakeBedTime';
import EnjoyYourDay from './reminder-elements/EnjoyYourDay';
import TimeToRelax from './reminder-elements/TimeToRelax';
import StopCoffee from './reminder-elements/StopCoffee';
import StopHeavyMeals from './reminder-elements/StopHeavyMeals';
import StopScreens from './reminder-elements/StopScreens';

export default function ReminderCard( { time, wakeTime, Testing } ) {
	const [isLoading, setIsLoading] = useState( true );

	// DONE: Reminder functionality
	const [reminder, setReminder] = useState( '' );
	const [bedTime, setBedTime] = useState( '' );
	useEffect( () => {
		// async
		if ( !wakeTime || !time ) return;

		// calculate bedTime from wakeTime
		const bedTimeDate = new Date();
		let [hh, mm] = wakeTime.split( ':' );
		bedTimeDate.setHours( hh );
		bedTimeDate.setMinutes( mm );
		bedTimeDate.setSeconds( 0 );
		bedTimeDate.setHours( bedTimeDate.getHours() - 8 );
		setBedTime( bedTimeDate.getHours().toString().padStart( 2, '0' ) + ':' + bedTimeDate.getMinutes().toString().padStart( 2, '0' ) );

		// get wakeTime, convert string to date
		const wakeTimeDate = new Date();
		[hh, mm] = wakeTime.split( ':' );
		wakeTimeDate.setHours( hh );
		wakeTimeDate.setMinutes( mm );

		// calculations for each state
		//	* screens 1h before bed
		//	* heavy meals 3h before bed
		//	* coffee 5h before bed
		// TODO: coffee or alcohol should be displayed only when selected by user
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

				<div className="card">

					{ reminder === 'relax' &&
						<div className='flex-col-evenly flex-align-center gap-sm'>
							<div>
								<h3></h3>
								<h3></h3>
								<h3></h3>
							</div>
							<div className='reminder-graphic flex-col-between flex-align-center gap-md'>
								<h1><strong style={{ 'color': '#bb86fc', 'fontSize': '1.2em' }}>time to sleep</strong></h1>
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
								<h1><strong style={{ 'color': '#bb86fc', 'fontSize': '1.2em' }}>time to relax</strong></h1>
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
								<h1><strong style={{ 'color': '#D9FDED', 'fontSize': '1.2em' }}>enjoy your day</strong></h1>
								<EnjoyYourDay />
								<Clock time={time} />
								<WakeBedTime wakeTime={wakeTime} bedTime={bedTime} />
							</div>
						</div>
					}

					<br/>

				</div>

				<form onSubmit={Testing} className='demo'>
					<input placeholder="DEMO: type 15, 19, 21, ..."/>
					<button>Simulate Time Change</button>
				</form>

			</>
		);
	}
}
