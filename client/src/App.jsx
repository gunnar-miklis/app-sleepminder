import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import WelcomePage from './pages/WelcomePage';

function App() {
	return (
		<main>
			<Routes>
				<Route path='/start' element={<StartPage />} />
				<Route path='/welcome' element={<WelcomePage />} />
			</Routes>
		</main>
	);
}

export default App;
