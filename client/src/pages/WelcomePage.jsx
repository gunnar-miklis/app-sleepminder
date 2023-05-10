import { Link } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
	return (
		<div className="welcome">
			<div>
				<h1>Hello!</h1>
				<p>Let&#39;s improve your daily routine to get a better sleep</p>
				<Link to="/signup" className="btn-lg">Get started</Link>
			</div>
			<div>
				<h1 className='brand-title'><span>Sleep</span>Minder</h1>
			</div>
		</div>
	);
}

export default WelcomePage;
