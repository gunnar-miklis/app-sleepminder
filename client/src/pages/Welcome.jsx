import './Welcome.css';
import { Link } from 'react-router-dom';
import StartUp from '../components/StartUp';
import { useEffect, useState } from 'react';

function Welcome() {
	const [isStarting, setIsStarting] = useState( true );

	useEffect( () => {
		setTimeout( () => setIsStarting( false ), 5000 );
	}, [] );

	if ( isStarting ) {
		return <StartUp />;
	} else {
		return (
			<div className="welcome flex-col-between flex-align-center">
				<div className="flex-col-between flex-align-center gap-xl">
					<h1>Hello!</h1>
					<p>Let&#39;s improve your daily routine to get a better sleep</p>
					<Link to="/setup" className="btn-lg">Get started</Link>
				</div>
				<div className="flex-col-between flex-align-center">
					<h1>Cross-Class Collaboration</h1>
					<p><a href="" target="_blank">Name</a> (data)</p>
					<p><a href="" target="_blank">Alex</a>, <a href="" target="_blank">Gabriela</a>, <a href="" target="_blank">Marta</a> (ux/ui)</p>
					<p><a href="" target="_blank">Gunnar</a> (webDev)</p>
				</div>
			</div>
		);
	}
}

export default Welcome;
