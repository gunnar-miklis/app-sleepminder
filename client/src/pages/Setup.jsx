import './Setup.css';
import { useState } from 'react';
import SetupStepOne from '../components/setup/Step1';
import SetupStepTwo from '../components/setup/Step2';
import SetupStepThree from '../components/setup/Step3';
import SetupStepFour from '../components/setup/Step4';
import ProgressBar from '../components/setup/ProgressBar';

function Setup() {
	const [step, setStep] = useState( 1 );

	function nextStep( step ) {
		setStep( step );
	}
	function previousStep( step ) {
		setStep( step );
	}
	return (
		<div className="setup flex-col-between flex-align-center">

			{ step === 1 && 
				<>
					<ProgressBar currentStep={step} />
					<SetupStepOne nextStep={nextStep} />
				</> 
			}
			{ step === 2 && 
				<>
					<ProgressBar currentStep={step} />
					<SetupStepTwo nextStep={nextStep} previousStep={previousStep} />
				</> 
			}
			{ step === 3 && 
				<>
					<ProgressBar currentStep={step} />
					<SetupStepThree nextStep={nextStep} previousStep={previousStep}/>
				</> 
			}
			{ step === 4 && 
				<>
					<ProgressBar currentStep={step} />
					<SetupStepFour previousStep={previousStep} />
				</> 
			}
		</div>
	);
}

export default Setup;
