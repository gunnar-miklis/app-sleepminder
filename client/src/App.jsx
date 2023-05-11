import './App.css';
import { Routes, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import Welcome from './pages/Welcome';
import SetupStepOne from './components/setup/Step1';
import SetupStepTwo from './components/setup/Step2';
import SetupStepThree from './components/setup/Step3';
import SetupStepFour from './components/setup/Step4';
import Home from './pages/Home';
import Setup from './pages/Setup';

function App() {
	return (
		<main className=''>
			<Routes>
				<Route path="/loading" element={<Loading />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/setup" element={<Setup />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</main>
	);
}

export default App;
