import './Edit.css';
import Avatar from '../components/Avatar';
import Birth from '../components/setup/inputs/Birth';
import Gender from '../components/setup/inputs/Gender';
import Height from '../components/setup/inputs/Height';
import Weight from '../components/setup/inputs/Weight';
import WakeTime from '../components/setup/inputs/WakeTime';
import SleepTips from '../components/setup/inputs/SleepTips';
import Caffeine from '../components/setup/inputs/Caffeine';
import Alcohol from '../components/setup/inputs/Alcohol';
import apiService from '../service/api.services';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import LinkToDashboard from '../components/dashboard/LinkToDashboard';
import { AuthContext } from '../context/auth.context';

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

	useEffect( ()=> {
		setIsLoading( true );
		apiService.user()
			.then( ( user ) => {
				const { username, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = user.data;

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
				setIsLoading( false );
			} );
	}, [] );

	function handleUpdate( e ) {
		e.preventDefault();
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
		setIsLoading( true );
		apiService.updateUser( { birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } )
			.then( ( updatedUser ) => {
				navigate( '/dashboard' );
				setIsLoading( false );
			} )
			.catch( ( err ) => {
				setIsLoading( false );
			} );
		return;
	}

	const [showModal, setShowModal] = useState( 'none' );
	function handleDeleteUser() {
		setIsLoading( true );
		apiService.deleteUser()
			.then( ( res )=>{
				setIsLoading( false );
				setShowElement( false );
				setErrorMessage( res.data.message );
				setTimeout( () => {
					setShowElement( true );
					logOutUser();
					navigate( '/welcome' );
				}, 5000 );
			} ).catch( ( err ) => {
				setIsLoading( false );
			} );
	}

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className='setup edit flex-col-evenly gap-lg'>
				<div className='modal-delete-confimation gap-md' style={{ 'display': showModal }}>
					<h1 style={ showElement ? { 'display': 'block' } : { 'display': 'none' }}>Really want to<br/>delete your profile?</h1>
					{ errorMessage && <h1 style={{ 'maxWidth': '60%', 'color': 'var(--col-secondary)' }}>{errorMessage}</h1> }
					<button className='btn-sm' onClick={handleDeleteUser} style={ showElement ? { 'display': 'block' } : { 'display': 'none' }}>YES</button>
					<button className='btn-skip' onClick={()=>setShowModal( 'none' )} style={ showElement ? { 'display': 'block' } : { 'display': 'none' }}>don&#39;t delete</button>
				</div>

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
