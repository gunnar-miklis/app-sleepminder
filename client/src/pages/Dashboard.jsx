import './Dashboard.css';
import { useEffect, useState } from 'react';
import UserCard from '../components/dashboard/UserCard';
import ReminderCard from '../components/dashboard/ReminderCard';
import MoodCard from '../components/dashboard/MoodCard';
import LineChartCard from '../components/dashboard/LineChartCard';
import DoughnutChartCard from '../components/dashboard/DoughnutChartCard';
import apiService from '../service/api.services';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Dashboard() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState( true );
	const [username, setUsername] = useState();
	const [moods, setMood] = useState();
	const [showMoodCard, setShowMoodCard] = useState( true );
	const [wakeTime, setWakeTime] = useState();
	const [bedTime, setBedTime] = useState();
	const [time, setTime] = useState( new Date() );

	// update every 1 second
	// useEffect( () => {
	// 	setInterval( () => {
	// 		setTime( new Date() );
	// 	}, 1000 );
	// }, [] );
	// TESTING
	function Testing( e ) {
		e.preventDefault();
		const date = new Date();
		date.setHours( Number( e.target[0].value ) );
		setTime( date );
	}

	function initializeDashboard() {
		setIsLoading( true );
		apiService.dashboardUser()
			.then( ( user ) => {
				console.log( 'user.data client dashboard user  :>> ', user.data );
				console.log( 'user.data.moods :>> ', user.data.moods );

				setUsername( user.data.username );
				setWakeTime( user.data.wakeTime );
				setBedTime( user.data.bedTime );
				setMood( user.data.moods );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				console.log( err );
				setIsLoading( false );
			} );
	}

	useEffect( ()=> {
		initializeDashboard();
	}, [] );

	function addMood( mood ) {
		setIsLoading( true );
		console.log( 'mood', mood );
		apiService.mood( { mood } )
			.then( ( updatedMoods ) => {
				console.log( 'updatedMoods client add mood :>> ', updatedMoods.data );
				setMood( updatedMoods.data );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				console.log( 'err client add mood :>> ', err );
				setIsLoading( false );
			} );
		setShowMoodCard( false );
	}
	useEffect( ()=> {
		// TODO: here we should also store and check for the day
		if ( time.getHours() > 7 ) setShowMoodCard( true );
	}, [] );

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className="dashboard flex-col-between gap-sm">
				{ moods && <UserCard username={username} moods={moods} /> }
				{ showMoodCard && <MoodCard time={time} addMood={addMood}/> }
				{ wakeTime && <ReminderCard time={time} wakeTime={wakeTime} bedTime={bedTime} Testing={Testing}/> }
				{ moods && <LineChartCard moods={moods}/> }
				{ moods && <DoughnutChartCard moods={moods}/> }
			</div>
		);
	}
}

export default Dashboard;
