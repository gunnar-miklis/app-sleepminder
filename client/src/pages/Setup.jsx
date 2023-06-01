import './Setup.css';
import apiService from '../service/api.services';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

// components
import Spinner from '../components/Spinner';
import ProgressBar from '../components/setup/ProgressBar';
import StepOne from '../components/setup/StepOne';
import StepTwo from '../components/setup/StepTwo';
import StepThree from '../components/setup/StepThree';
import StepFour from '../components/setup/StepFour';

// user input will be stored during all setup steps
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

export default function Setup() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState( false );
	const { storeToken, authenticateUser } = useContext( AuthContext );
	const [errorMessage, setErrorMessage] = useState( '' );

	// DONE: navigate between setup-steps
	const [currentStep, setCurrentStep] = useState( 1 );
	function goPreviousStep( step ) {
		setCurrentStep( step );
	}

	// DONE: handle step 1 user input
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

		// store step 1 in 'user' object
		user.username = e.target[0].value;
		user.password = e.target[1].value;
		user.birth = e.target[2].value;
		user.gender = e.target[3].value;
		user.weight = e.target[4].value;
		user.height = e.target[5].value;

		// go to next step
		setCurrentStep( currentStep + 1 );

		// reset error message
		setErrorMessage( '' );
	}

	// DONE: handle step 2 user input
	function handleStepTwoSubmit( e ) {
		e.preventDefault();

		// store step 2 in 'user' object
		user.wakeTime = e.target[0].value;

		// go to next step
		setCurrentStep( currentStep + 1 );
	}

	// DONE: handle step 3 user input
	function handleStepThreeSubmit( e ) {
		e.preventDefault();

		// user input
		const sleepTips = [
			e.target[0].value,
			e.target[1].value,
			e.target[2].value,
			e.target[3].value,
			e.target[4].value,
			e.target[5].value,
			e.target[6].value,
		];

		// store step 3 in 'user' object
		user.sleepTips = sleepTips;

		// go to next step
		setCurrentStep( currentStep + 1 );
	}

	// DONE: handle step 4 user input
	function handleStepFourSubmit( e ) {
		e.preventDefault();

		// user input
		user.caffeine = e.target[0].value;
		user.alcohol = e.target[1].value;

		setIsLoading( true );
		// DONE: signup user, send 'user' object to the backend via api
		apiService.signup( user )
			.then( () => {
				// DONE: after signup, directly login the user, too
				apiService.login( { username: user.username, password: user.password } )
					.then( ( resLogin ) => {
						// backend creates jwt token and sends to client. client stores token in local storage
						storeToken( resLogin.data.authToken );
						// user gets verfied by backend via valid token
						authenticateUser();

						// redirect to dashboard page
						navigate( '/dashboard' );
						setIsLoading( false );
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
					/>
				</>
				}

				{ errorMessage && <p className="error">{errorMessage}</p> }

			</div>
		);
	}
}
