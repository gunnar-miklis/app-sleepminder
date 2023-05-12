import './Dashboard.css';
import ReminderCard from '../components/dashboard/ReminderCard';
import UserCard from '../components/dashboard/UserCard';
import MoodCard from '../components/dashboard/MoodCard';
import LineChartCard from '../components/dashboard/LineChartCard';
import DoughnutChartCard from '../components/dashboard/DoughnutChartCard';

function Dashboard() {
	return (
		<div className="dashboard flex-col-between gap-sm">
			<UserCard />
			<ReminderCard />
			<MoodCard />
			<LineChartCard />
			<DoughnutChartCard />
		</div>
	);
}

export default Dashboard;
