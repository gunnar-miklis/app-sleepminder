import { useEffect, useState } from 'react';
import './MoodCard.css';
import apiService from '../../service/api.services';
import { useNavigate } from 'react-router-dom';
export default function MoodCard( { time, moods } ) {
	const navigate = useNavigate();
	const [showMoodCard, setShowMoodCard] = useState( true );

	useEffect( ()=> {
		if ( time.getHours() > 7 ) setShowMoodCard( true );
	}, [] );

	function submitGreat( e ) {
		console.log( 'great' );
		apiService.mood( { mood: 5 } )
			.then( ( res ) => {
				console.log( 'res client add mood :>> ', res.data );
				navigate( '/dashboard' );
			} )
			.catch( ( err ) => {
				console.log( 'err client add mood :>> ', err );
			} );
		setShowMoodCard( false );
		return;
	}
	function submitGood( e ) {
		console.log( 'good' );
		apiService.mood( { mood: 4 } )
			.then( ( res ) => {
				console.log( 'res client add mood :>> ', res.data );
				navigate( '/dashboard' );
			} )
			.catch( ( err ) => {
				console.log( 'err client add mood :>> ', err );
			} );
		setShowMoodCard( false );
		return;
	}
	function submitOk( e ) {
		console.log( 'ok' );
		apiService.mood( { mood: 3 } )
			.then( ( res ) => {
				console.log( 'res client add mood :>> ', res.data );
				navigate( '/dashboard' );
			} )
			.catch( ( err ) => {
				console.log( 'err client add mood :>> ', err );
			} );
		setShowMoodCard( false );
		return;
	}
	function submitBad( e ) {
		console.log( 'bad' );
		apiService.mood( { mood: 2 } )
			.then( ( res ) => {
				console.log( 'res client add mood :>> ', res.data );
				navigate( '/dashboard' );
			} )
			.catch( ( err ) => {
				console.log( 'err client add mood :>> ', err );
			} );
		setShowMoodCard( false );
		return;
	}
	function submitPoor( e ) {
		console.log( 'poor' );
		apiService.mood( { mood: 1 } )
			.then( ( res ) => {
				console.log( 'res client add mood :>> ', res.data );
			} )
			.catch( ( err ) => {
				console.log( 'err client add mood :>> ', err );
			} );
		setShowMoodCard( false );
		return;
	}
	return (
		<div className="mood flex-col-between gap-sm">
			{showMoodCard &&
			<>
				<h3 className="card-header">How did you sleep last night?</h3>
				<div className="card flex-row-evenly">
					<button onClick={ ()=>submitGreat() } className="flex-col-between flex-align-center gap-sm">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 26.6666C16.6773 26.6666 14.0453 24.44 13.456 21.3333H26.544C25.9546 24.44 23.3226 26.6666 20 26.6666Z" fill="#D9FDED"/>
							<path fillRule="evenodd" clipRule="evenodd" d="M0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20ZM10.6667 16H13.3333V13.3333H10.6667V16ZM12 18.6667C11.6464 18.6667 11.3072 18.8071 11.0572 19.0572C10.8071 19.3072 10.6667 19.6464 10.6667 20C10.6667 25.2533 14.7467 29.3333 20 29.3333C25.2533 29.3333 29.3333 25.2533 29.3333 20C29.3333 19.6464 29.1929 19.3072 28.9428 19.0572C28.6928 18.8071 28.3536 18.6667 28 18.6667H12ZM29.3333 16H26.6667V13.3333H29.3333V16Z" fill="#D9FDED"/>
						</svg>
						<p className="p-sm">Great</p>
					</button>
					<button onClick={ ()=>submitGood() } className="flex-col-between flex-align-center gap-sm">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20ZM10.6667 16H13.3333V13.3333H10.6667V16ZM26.6667 16H29.3333V13.3333H26.6667V16ZM13.0667 23.2C13.8739 24.2764 14.9207 25.15 16.1241 25.7517C17.3276 26.3534 18.6545 26.6667 20 26.6667C21.3455 26.6667 22.6724 26.3534 23.8759 25.7517C25.0793 25.15 26.1261 24.2764 26.9333 23.2L29.0667 24.8C24.5333 30.8453 15.4667 30.8453 10.9333 24.8L13.0667 23.2Z" fill="#BB86FC"/>
						</svg>
						<p className="p-sm">Good</p>
					</button>
					<button onClick={ ()=>submitOk() } className="flex-col-between flex-align-center gap-sm">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20ZM10.6667 16H13.3333V13.3333H10.6667V16ZM26.6667 16H29.3333V13.3333H26.6667V16ZM29.3333 24V26.6667H10.6667V24H29.3333Z" fill="#F5F2FF"/>
						</svg>
						<p className="p-sm">O.K.</p>
					</button>
					<button onClick={ ()=>submitBad() } className="flex-col-between flex-align-center gap-sm">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20ZM10.6667 16H13.3333V13.3333H10.6667V16ZM15.52 29.4267C18.9973 27.2492 23.0751 26.2298 27.168 26.5147L28.496 26.608L28.6827 23.9467L27.3493 23.856C22.6963 23.5324 18.0604 24.6909 14.1067 27.1653L12.976 27.8747L14.392 30.1333L15.52 29.4267ZM29.3333 16H26.6667V13.3333H29.3333V16Z" fill="#C3C0CE"/>
						</svg>
						<p className="p-sm">Bad</p>
					</button>
					<button onClick={ ()=>submitPoor() } className="flex-col-between flex-align-center gap-sm">
						<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20ZM10.6667 16H13.3333V13.3333H10.6667V16ZM26.6667 16H29.3333V13.3333H26.6667V16ZM13.0667 27.4667C13.8739 26.3903 14.9207 25.5167 16.1241 24.915C17.3276 24.3133 18.6545 24 20 24C21.3455 24 22.6724 24.3133 23.8759 24.915C25.0793 25.5167 26.1261 26.3903 26.9333 27.4667L29.0667 25.8667C24.5333 19.8213 15.4667 19.8213 10.9333 25.8667L13.0667 27.4667Z" fill="#262134"/>
						</svg>
						<p className="p-sm">Poor</p>
					</button>
				</div>
			</>
			}
		</div>
	);
}
