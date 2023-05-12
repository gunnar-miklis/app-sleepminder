import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';

function App() {
	return (
		<main>
			<Routes>
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/setup" element={<Setup />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</main>
	);
}

export default App;
