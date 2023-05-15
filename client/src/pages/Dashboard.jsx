import './Dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/dashboard/UserCard';
import ReminderCard from '../components/dashboard/ReminderCard';
import MoodCard from '../components/dashboard/MoodCard';
import LineChartCard from '../components/dashboard/LineChartCard';
import DoughnutChartCard from '../components/dashboard/DoughnutChartCard';

const API_URL = 'http://localhost:2711';

function Dashboard() {
	const [username, setUsername] = useState();
	const [moods, setMood] = useState();
	const [wakeTime, setWakeTime] = useState();
	const [bedTime, setBedTime] = useState();

	useEffect( ()=> {
		const storedToken = localStorage.getItem( 'authToken' );
		axios.get( `${API_URL}/dashboard/user`, { headers: { Authorization: `Bearer ${storedToken}` } } )
			.then( ( res ) => {
				console.log( 'res axios.get(dashboard) :>> ', res.data );

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
			<ReminderCard wakeTime={wakeTime} bedTime={bedTime}/>
			<MoodCard handleMoodSubmit={handleMoodSubmit}/>
			<LineChartCard moods={moods}/>
			<DoughnutChartCard moods={moods}/>
		</div>
	);
}

export default Dashboard;
