import './Dashboard.css';
import { useEffect, useState } from 'react';
import UserCard from '../components/dashboard/UserCard';
import ReminderCard from '../components/dashboard/ReminderCard';
import MoodCard from '../components/dashboard/MoodCard';
import LineChartCard from '../components/dashboard/LineChartCard';
import DoughnutChartCard from '../components/dashboard/DoughnutChartCard';
import apiService from '../service/api.services';

function Dashboard() {
	const [username, setUsername] = useState();
	const [moods, setMood] = useState();
	const [wakeTime, setWakeTime] = useState();
	const [bedTime, setBedTime] = useState();
	const [time, setTime] = useState( new Date() );
	// update every 1 second
	useEffect( () => {
		setInterval( () => {
			// DEFAULT
			// setTime( new Date() );

			// TESTING
			const date = new Date();
			date.setHours( 18 );
			setTime( date );
		}, 1000 );
	}, [] );

	useEffect( ()=> {
		apiService.dashboardUser()
			.then( ( res ) => {
				console.log( 'res.data client dashboard user  :>> ', res.data );

				// COMMENT: is this how we do it? or do we get this data from context?
				setUsername( res.data.username );
				setWakeTime( res.data.wakeTime );
				setBedTime( res.data.bedTime );
				setMood( res.data.moods );
			} )
			.catch( ( err ) => console.log( err ) );
	}, [] );

	function handleMoodSubmit( e ) {
		return;
	}

	return (
		<div className="dashboard flex-col-between gap-sm">
			<UserCard username={username} moods={moods} />
			<ReminderCard time={time} wakeTime={wakeTime} bedTime={bedTime}/>
			<MoodCard time={time} handleMoodSubmit={handleMoodSubmit}/>
			<LineChartCard moods={moods}/>
			<DoughnutChartCard moods={moods}/>
		</div>
	);
}

export default Dashboard;
