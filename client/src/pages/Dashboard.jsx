import './Dashboard.css';
import apiService from '../service/api.services';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';

// components
import Spinner from '../components/Spinner';
import LinkToUpdateUser from '../components/dashboard/LinkToUpdateUser';
import UserCard from '../components/dashboard/UserCard';
import MoodCard from '../components/dashboard/MoodCard';
import ReminderCard from '../components/dashboard/ReminderCard';
import LineChartCard from '../components/dashboard/LineChartCard';
import DoughnutChartCard from '../components/dashboard/DoughnutChartCard';

export default function Dashboard() {
	const [isLoading, setIsLoading] = useState( true );
	const { logOutUser } = useContext( AuthContext );

	const [username, setUsername] = useState();
	const [moods, setMood] = useState();
	const [showMoodCard, setShowMoodCard] = useState( true );
	const [wakeTime, setWakeTime] = useState();
	const [time, setTime] = useState( new Date() );

	// COMMENT: normal behavior: update clock every 1 second
	// useEffect( () => {
	// 	setInterval( () => {
	// 		setTime( new Date() );
	// 	}, 1000 );
	// }, [] );
	// TESTING: set time only once for demonstration purpose
	function Testing( e ) {
		e.preventDefault();
		const date = new Date();
		date.setHours( Number( e.target[0].value ) );
		setTime( date );
	}

	// DONE: get user data from backend via api, execute only once
	useEffect( ()=> {
		setIsLoading( true );
		apiService.dashboard()
			.then( ( userFromDb ) => {
				setUsername( userFromDb.data.username );
				setWakeTime( userFromDb.data.wakeTime );
				setMood( userFromDb.data.moods );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				setIsLoading( false );
			} );
	}, [] );

	// DONE: update mood array on user input
	function addMood( mood ) {
		setIsLoading( true );
		apiService.updateMood( { mood } )
			.then( ( updatedMoods ) => {
				// use the updated mood from the response immediately
				setMood( updatedMoods.data );
				// hide the mood card after submit, "mood card timeout"
				setShowMoodCard( false );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				console.error( err );
			} );
	}

	// TODO: reset "mood card timeout"
	//	here we should also store and check for the day
	useEffect( ()=> {
		if ( time.getHours() > wakeTime ) setShowMoodCard( true );
	}, [] );

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className="dashboard flex-col-between gap-sm">

				{/* navigation icon: go to user update page */}
				<div className='nav-right'>
					<LinkToUpdateUser />
				</div>

				{/* dashboard cards */}
				{ moods && <UserCard username={username} moods={moods} /> }
				{ showMoodCard && <MoodCard addMood={addMood} /> }
				{ wakeTime && <ReminderCard time={time} wakeTime={wakeTime} Testing={Testing} /> }
				{ moods && <LineChartCard moods={moods} /> }
				{ moods && <DoughnutChartCard moods={moods} /> }

				<div className='flex-row-evenly'>
					<button className='btn-skip btn-label' onClick={()=>logOutUser()}>Logout?</button>
				</div>

			</div>
		);
	}
}
