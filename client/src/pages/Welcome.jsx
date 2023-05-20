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
					<p>🏆 <span style={{ 'color': 'var(--col-secondary)' }}>Winning Project, in the Hackshows final voting!</span> 🏆 </p>
					<p>
						<a href="https://www.linkedin.com/in/angelica-blanco/" target="_blank" rel="noreferrer">Angélica Blanco</a>,&nbsp;
						<a href="https://www.linkedin.com/in/juan-giussani/" target="_blank" rel="noreferrer">Juan A. Giussani</a>&nbsp;
						(data)</p>
					<p>
						<a href="" target="_blank">Alex</a>,&nbsp;
						<a href="https://www.linkedin.com/in/gabcarneiro" target="_blank" rel="noreferrer">Gabriela Carneiro</a>,&nbsp;
						<a href="" target="_blank">Marta</a>&nbsp;
						(ux/ui)</p>
					<p>
						<a href="https://flowcv.me/gunnar-miklis" target="_blank" rel="noreferrer">Gunnar Miklis</a>&nbsp;
						(webDev)</p>
				</div>
			</div>
		);
	}
}

export default Welcome;
