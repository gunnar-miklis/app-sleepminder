import './UserAreas.css';
import Navbar from '../components/design/Navbar';
import ReminderCard from '../components/design/cards/ReminderCard';
import UserSmCard from '../components/design/cards/UserSmCard';
import { useState } from 'react';
import Home from '../components/areas/Home';
import Sleep from '../components/areas/Sleep';
import Explore from '../components/areas/Explore';

function UserAreas() {
	const [area,setArea] = useState('home');

	function goToArea( str ) {
		setArea(str);
	}

	return (
		<div className="user-area">
			{ area === 'home' && <Home />}
			{ area === 'sleep' && <Sleep />}
			{ area === 'explore' && <Explore />}
			<Navbar area={area} goToArea={goToArea}/>
		</div>
	);
}

export default UserAreas;
