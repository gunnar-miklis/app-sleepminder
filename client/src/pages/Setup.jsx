import './Setup.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepOne from '../components/setup/StepOne';
import StepTwo from '../components/setup/StepTwo';
import StepThree from '../components/setup/StepThree';
import StepFour from '../components/setup/StepFour';
import ProgressBar from '../components/setup/ProgressBar';
import apiService from '../service/api.services';
import { AuthContext } from '../context/auth.context';
import Spinner from '../components/Spinner';

const user = {
	username: '',
	password: '',
	birth: '',
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
	const [isLoading, setIsLoading] = useState( false );
	const { storeToken, authenticateUser } = useContext( AuthContext );
	const [errorMessage, setErrorMessage] = useState( '' );

	// navigate steps
	const [currentStep, setCurrentStep] = useState( 1 );
	function goPreviousStep( step ) {
		setCurrentStep( step );
	}

	function handleStepOneSubmit( e ) {
		e.preventDefault();
		// valdidate username
		if ( !e.target[0].value ) {
			setErrorMessage( 'Provide a Username' );
			return;
		}
		// validate password
		if ( !e.target[1].value ) {
			setErrorMessage( 'Provide a Password' );
			return;
		} else if ( !/(?=.*\d)/.test( e.target[1].value ) ) {
			setErrorMessage( 'Password musst include a Digit.' );
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

	function handleStepTwoSubmit( e ) {
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

		setIsLoading( true );
		apiService.signup( user )
			.then( ( resSignup ) => {
				// NOTE: after signup, also Login the user
				apiService.login( { username: user.username, password: user.password } )
					.then( ( resLogin ) => {
						storeToken( resLogin.data.authToken );
						authenticateUser();
						setIsLoading( false );
						navigate( '/dashboard' );
					} )
					.catch( ( err ) => {
						setErrorMessage( err.res.data.message );
					} );
			} )
			.catch( ( err ) => {
				setErrorMessage( err.response.data.message );
				setIsLoading( false );
			} );
	}


	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className="setup flex-col-between flex-align-center gap-lg">

				{ currentStep === 1 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepOne
						user={user}
						handleStepOneSubmit={handleStepOneSubmit}
					/>
				</>
				}
				{ currentStep === 2 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepTwo
						user={user}
						handleStepTwoSubmit={handleStepTwoSubmit}
						goPreviousStep={goPreviousStep}
					/>
				</>
				}
				{ currentStep === 3 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepThree
						user={user}
						handleStepThreeSubmit={handleStepThreeSubmit}
						goPreviousStep={goPreviousStep}
					/>
				</>
				}
				{ currentStep === 4 &&
				<>
					<ProgressBar currentStep={currentStep} />
					<StepFour
						handleStepFourSubmit={handleStepFourSubmit}
						goPreviousStep={goPreviousStep}
						errorMessage={errorMessage}
					/>
				</>
				}

				{ errorMessage && <p className="error">{errorMessage}</p> }

			</div>
		);
	}
}

export default Setup;
