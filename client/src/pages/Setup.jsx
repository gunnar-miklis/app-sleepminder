import './Setup.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepOne from '../components/setup/StepOne';
import StepTwo from '../components/setup/StepTwo';
import StepThree from '../components/setup/StepThree';
import StepFour from '../components/setup/StepFour';
import ProgressBar from '../components/setup/ProgressBar';
import apiService from '../service/api.services';
import { AuthContext } from '../context/auth.context';

const user = {
	username: '',
	password: '',
	birth: new Date(),
	gender: '',
	weight: 0,
	height: 0,
	wakeTime: '',
	sleepTips: [],
	caffeine: false,
	alcohol: false,
};

function Setup() {
	const navigate = useNavigate();
	const { storeToken, authenticateUser } = useContext( AuthContext );
	const [errorMessage, setErrorMessage] = useState( '' );

	// navigate steps
	const [currentStep, setCurrentStep] = useState( 1 );

	function handleStepOneSubmit( e ) {
		e.preventDefault();
		// valdidate username
		if ( !e.target[0].value ) {
			setErrorMessage( 'Provide a username' );
			return;
		}
		// validate password
		if ( !e.target[1].value ) {
			setErrorMessage( 'Provide a password' );
			return;
		} else if ( !/(?=.*\d)/.test( e.target[1].value ) ) {
			setErrorMessage( 'Password musst include a digit.' );
			return;
		} else if ( !/(?=.*[a-z])/.test( e.target[1].value ) ) {
			setErrorMessage( 'Password musst include a lowercase character.' );
			return;
		} else if ( !/(?=.*[A-Z])/.test( e.target[1].value ) ) {
			setErrorMessage( 'Password musst include a UPPERcase character.' );
			return;
		} else if ( !/(?=.*).{6,}/.test( e.target[1].value ) ) {
			setErrorMessage( 'Password musst have at least 6 or more characters.' );
			return;
		}
		// valdiate gender select, if empty write ''
		if ( e.target[3].value === 'What best describes your gender?' ) e.target[3].value = '';

		// store step one in 'user' object
		user.username = e.target[0].value;
		user.password = e.target[1].value;
		user.birth = e.target[2].value;
		user.gender = e.target[3].value;
		user.weight = e.target[4].value;
		user.height = e.target[5].value;
		setCurrentStep( currentStep + 1 );
		setErrorMessage( '' );
	}
	console.log( 'user.wakeTime object :>> ', user.wakeTime );
	function handleStepTwoSubmit( e ) {
		console.log( 'e.target[0].value :>> ', e.target[0].value );
		user.wakeTime = e.target[0].value;
		setCurrentStep( currentStep + 1 );
	}
	function handleStepThreeSubmit( e ) {
		const sleepTips = [];
		sleepTips.push( e.target[0].value );
		sleepTips.push( e.target[1].value );
		sleepTips.push( e.target[2].value );
		sleepTips.push( e.target[3].value );
		sleepTips.push( e.target[4].value );
		sleepTips.push( e.target[5].value );
		sleepTips.push( e.target[6].value );
		user.sleepTips = sleepTips;
		setCurrentStep( currentStep + 1 );
	}
	function handleStepFourSubmit( e ) {
		e.preventDefault();
		user.caffeine = e.target[0].value;
		user.alcohol = e.target[1].value;
		console.log( 'user before signup :>> ', user );
		apiService.signup( user )
			.then( ( resSignup ) => {
				// NOTE: after signup, also Login the user
				apiService.login( { username: user.username, password: user.password } )
					.then( ( resLogin ) => {
						console.log( 'JWT token', resLogin.data.authToken );
						storeToken( resLogin.data.authToken );
						authenticateUser();
						navigate( '/dashboard' );
					} )
					.catch( ( err ) => {
						console.log( 'client Login err :>> ', err );
						setErrorMessage( err.res.data.message );
					} );
				navigate( '/login' );
			} )
			.catch( ( err ) => {
				console.log( 'err client signup :>> ', err );
				setErrorMessage( err.response.data.message );
			} );
	}

	return (
		<div className="setup flex-col-between flex-align-center gap-lg">

			{ currentStep === 1 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepOne
						handleStepOneSubmit={handleStepOneSubmit}
					/>
				</>
			}
			{ currentStep === 2 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepTwo
						handleStepTwoSubmit={handleStepTwoSubmit}
					/>
				</>
			}
			{ currentStep === 3 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepThree
						handleStepThreeSubmit={handleStepThreeSubmit}
					/>
				</>
			}
			{ currentStep === 4 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepFour
						handleStepFourSubmit={handleStepFourSubmit}
						errorMessage={errorMessage}
					/>
				</>
			}

			{ errorMessage && <p>{errorMessage}</p> }
		</div>
	);
}

export default Setup;
