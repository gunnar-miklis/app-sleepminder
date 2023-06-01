import './Dashboard.css';
import apiService from '../service/api.services';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
		apiService.dashboard()
			.then( ( user ) => {
				setUsername( user.data.username );
				setWakeTime( user.data.wakeTime );
				setMood( user.data.moods );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				setIsLoading( false );
			} );
	}

	useEffect( ()=> {
		initializeDashboard();
	}, [] );

	function addMood( mood ) {
		setIsLoading( true );
		apiService.updateMood( { mood } )
			.then( ( updatedMoods ) => {
				setMood( updatedMoods.data );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
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
				<div className='nav-right'>
					<LinkToUpdateUser />
				</div>
				{ moods && <UserCard username={username} moods={moods} /> }
				{ showMoodCard && <MoodCard time={time} addMood={addMood}/> }
				{ wakeTime && <ReminderCard time={time} wakeTime={wakeTime} Testing={Testing}/> }
				{ moods && <LineChartCard moods={moods}/> }
				{ moods && <DoughnutChartCard moods={moods}/> }

				<div className='flex-row-evenly'>
					<button className='btn-skip btn-label' onClick={()=>logOutUser()}>Logout?</button>
				</div>
			</div>
		);
	}
}
