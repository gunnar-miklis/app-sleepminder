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
	const [demoTime, setDemoTime] = useState( 7 );
	// update every 1 second
	useEffect( () => {
		setInterval( () => {
		// DEFAULT
		// setTime( new Date() );

			// TESTING
			const date = new Date();
			date.setHours( demoTime );
			setTime( date );
		}, 1000 );
	}, [demoTime] );

	useEffect( ()=> {
		setIsLoading( true );
		apiService.dashboardUser()
			.then( ( res ) => {
				console.log( 'res.data client dashboard user  :>> ', res.data );

				// COMMENT: is this how we do it? or do we get this data from context?
				setUsername( res.data.username );
				setWakeTime( res.data.wakeTime );
				setBedTime( res.data.bedTime );
				setMood( res.data.moods );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				console.log( err );
				setIsLoading( false );
			} );
	}, [] );

	function addMood( mood ) {
		setIsLoading( true );
		console.log( 'mood', mood );
		apiService.mood( { mood } )
			.then( ( res ) => {
				console.log( 'res client add mood :>> ', res.data );
				navigate( '/dashboard' );
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

	function submitDemoValue( e ) {
		e.preventDefault();
		setDemoTime( e.target[0].value );
	}

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className="dashboard flex-col-between gap-sm">
				<UserCard username={username} moods={moods} />
				<ReminderCard time={time} wakeTime={wakeTime} bedTime={bedTime} submitDemoValue={submitDemoValue} />
				{ showMoodCard && <MoodCard time={time} addMood={addMood}/> }
				<LineChartCard moods={moods}/>
				<DoughnutChartCard moods={moods}/>
			</div>
		);
	}
}

export default Dashboard;
