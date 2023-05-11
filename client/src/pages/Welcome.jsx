import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
	return (
		<div className="welcome">
			<div>
				<h1>Hello!</h1>
				<p>Let&#39;s improve your daily routine to get a better sleep</p>
				<Link to="/setup/step-1" className="btn-lg">Get started</Link>
			</div>
			<div>
				<h1>Cross-Class Collaboration</h1>
				<p><a href="" target="_blank">Name</a> (data)</p>
				<p><a href="" target="_blank">Alex</a>, <a href="" target="_blank">Gabriela</a>, <a href="" target="_blank">Marta</a> (ux/ui)</p>
				<p><a href="" target="_blank">Gunnar</a> (webDev)</p>
			</div>
		</div>
	);
}

export default Welcome;
