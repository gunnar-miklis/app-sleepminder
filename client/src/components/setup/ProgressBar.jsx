import './ProgressBar.css';

export default function ProgressBar( { currentStep } ) {
	return (
		<div className="step-progress-bar flex-row-center gap-sm">
			{ currentStep === 1 ? <div className="active" data-step="Step 1"></div> : <div></div> }
			{ currentStep === 2 ? <div className="active" data-step="Step 2"></div> : <div></div> }
			{ currentStep === 3 ? <div className="active" data-step="Step 3"></div> : <div></div> }
			{ currentStep === 4 ? <div className="active" data-step="Step 4"></div> : <div></div> }
		</div>
	);
}
