import './Edit.css';
import apiService from '../service/api.services';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

// components
import LinkToDashboard from '../components/dashboard/LinkToDashboard';
import Spinner from '../components/Spinner';
import Avatar from '../components/Avatar';
import Birth from '../components/setup/inputs/Birth';
import Gender from '../components/setup/inputs/Gender';
import Height from '../components/setup/inputs/Height';
import Weight from '../components/setup/inputs/Weight';
import WakeTime from '../components/setup/inputs/WakeTime';
import SleepTips from '../components/setup/inputs/SleepTips';
import Caffeine from '../components/setup/inputs/Caffeine';
import Alcohol from '../components/setup/inputs/Alcohol';

export default function Edit() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState( true );
	const { logOutUser } = useContext( AuthContext );
	const [showElement, setShowElement] = useState( true );
	const [errorMessage, setErrorMessage] = useState( '' );

	const [username, setUsername] = useState();
	const [birth, setBirth] = useState();
	const [gender, setGender] = useState();
	const [weight, setWeight] = useState();
	const [height, setHeight] = useState();
	const [wakeTime, setWakeTime] = useState();
	const [sleepTips, setSleepTips] = useState();
	const [caffeine, setCaffeine] = useState();
	const [alcohol, setAlcohol] = useState();

	// DONE: get user data from backend via api, execute only once
	useEffect( ()=> {
		setIsLoading( true );
		apiService.user()
			.then( ( userFromDb ) => {
				const { username, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = userFromDb.data;

				// set state: these will be used as values for the input fields. so the user sees their previous data
				setUsername( username );
				setBirth( birth );
				setGender( gender );
				setWeight( weight );
				setHeight( height );
				setWakeTime( wakeTime );
				setSleepTips( sleepTips );
				setCaffeine( caffeine );
				setAlcohol( alcohol );

				setIsLoading( false );
			} )
			.catch( ( err ) => {
				console.error( err );
			} );
	}, [] );

	// DONE: update user
	function handleUpdate( e ) {
		e.preventDefault();

		// user input
		const wakeTime = e.target[0].value;
		const weight = e.target[1].value;
		const height = e.target[2].value;
		const gender = e.target[3].value;
		const birth = new Date( e.target[4].value );
		const sleepTips = [
			e.target[5].value,
			e.target[6].value,
			e.target[7].value,
			e.target[8].value,
			e.target[8].value,
			e.target[10].value,
			e.target[11].value,
		];
		const caffeine = e.target[12].value;
		const alcohol = e.target[13].value;

		// DONE: update user, send user input to the backend via api
		setIsLoading( true );
		apiService.updateUser( { birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } )
			.then( () => {
				// redirect to dashboard page
				navigate( '/dashboard' );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				console.error( err );
			} );
		return;
	}

	// DONE: delete user, via api
	const [showModal, setShowModal] = useState( 'none' );
	function handleDeleteUser() {
		setIsLoading( true );
		apiService.deleteUser()
			.then( ( res )=>{
				// hide heading and buttons...
				setShowElement( false );
				// ...instead, show message "successfully deleted"
				setErrorMessage( res.data.message );

				// "fake loading time"
				setTimeout( () => {
					// reset hidden elements
					setShowElement( true );
					// logout user / remove token
					logOutUser();
					// navigate to welcome / start page
					navigate( '/welcome' );
				}, 4000 );

				setIsLoading( false );
			} ).catch( ( err ) => {
				console.error( err );
			} );
	}

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className='setup edit flex-col-evenly gap-lg'>

				{/* modal: delete confirmation */}
				<div className='modal-delete-confimation gap-md' style={{ 'display': showModal }}>
					<h1 style={ showElement ? { 'display': 'block' } : { 'display': 'none' }}>Really want to<br/>delete your profile?</h1>
					{ errorMessage && <h1 style={{ 'maxWidth': '60%', 'color': 'var(--col-secondary)' }}>{errorMessage}</h1> }
					<button className='btn-sm' onClick={handleDeleteUser} style={ showElement ? { 'display': 'block' } : { 'display': 'none' }}>YES</button>
					<button className='btn-skip' onClick={()=>setShowModal( 'none' )} style={ showElement ? { 'display': 'block' } : { 'display': 'none' }}>don&#39;t delete</button>
				</div>

				{/* navigation icon: "back to dashboard" */}
				<div className='flex-row-between flex-align-center'>
					<LinkToDashboard />
				</div>

				<h1>
					Update your profile
					<br/>
					<br/>
					{username}
				</h1>

				<Avatar />

				<form onSubmit={handleUpdate} className='flex-col-between flex-align-center gap-md'>
					<WakeTime value={wakeTime} />
					<Weight value={weight} />
					<Height value={height} />
					<Gender value={gender} />
					<Birth value={birth} />
					<br/>

					<SleepTips value={sleepTips}/>
					<br/>

					<Caffeine value={caffeine}/>
					<Alcohol value={alcohol}/>
					<br/>
					<br/>

					<button type='submit' className="btn-sm">Update Profile</button>
				</form>

				<div>
					<br/>
					<button className='btn-skip btn-label' onClick={()=>setShowModal( 'flex' )}>Delete Profile</button>
				</div>

			</div>
		);
	}
}
