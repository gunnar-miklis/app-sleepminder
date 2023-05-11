import './Home.css';
import Navbar from '../components/design/Navbar';
import ReminderCard from '../components/design/cards/ReminderCard';
import UserSmCard from '../components/design/cards/UserSmCard';

function Home() {
	return (
		<div className="home">
			<UserSmCard />
			<ReminderCard />
			<Navbar />
		</div>
	);
}

export default Home;
