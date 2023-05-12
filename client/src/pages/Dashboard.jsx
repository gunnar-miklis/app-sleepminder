import './Dashboard.css';
import ReminderCard from '../components/dashboard/ReminderCard';
import UserCard from '../components/dashboard/UserCard';
import MoodCard from '../components/dashboard/MoodCard';

function Dashboard() {
	return (
		<div className="dashboard flex-col-between flex-col-start gap-sm">
			<UserCard />
			<ReminderCard />
			<MoodCard />
		</div>
	);
}

export default Dashboard;
