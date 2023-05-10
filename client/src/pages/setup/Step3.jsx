import { Link } from 'react-router-dom';
import './setup.css';
import { useState } from 'react';

function SetupStepThree() {
	const [meditation, setMeditation] = useState( 'Meditation' );
	const [read, setRead] = useState( 'Read' );
	const [sounds, setSounds] = useState( 'Sounds/Music' );
	const [yoga, setYoga] = useState( 'Yoga' );
	const [sex, setSex] = useState( 'Sex' );
	const [lavender, setLavender] = useState( 'Lavender' );
	const [shower, setShower] = useState( 'Shower' );

	return (
		<div className="setup">

			<div className="step-progress-bar">
				<div></div>
				<div></div>
				<div className="active"></div>
				<div></div>
			</div>

			<div>
				<h1>Get sleep tips that fit you</h1>
				<p>Understanding what helps you fall asleep by checking the matching options.</p>
			</div>

			<form>
				<input type="checkbox" value={meditation} />
				<input type="checkbox" value={read} />
				<input type="checkbox" value={sounds} />
				<input type="checkbox" value={yoga} />
				<input type="checkbox" value={sex} />
				<input type="checkbox" value={lavender} />
				<input type="checkbox" value={shower} />
			</form>

			<div className='btn-wrapper'>
				<Link to="/setup/step-2" className="btn-skip">Skip</Link>
				<Link to="/setup/step-4" className="btn-sm">Next</Link>
			</div>

		</div>
	);
}

export default SetupStepThree;
