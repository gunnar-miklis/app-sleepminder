import './App.css';
import { Routes, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import Welcome from './pages/Welcome';
import SetupStepOne from './pages/setup/Step1';
import SetupStepTwo from './pages/setup/Step2';
import SetupStepThree from './pages/setup/Step3';
import SetupStepFour from './pages/setup/Step4';
import Home from './pages/Home';

function App() {
	return (
		<main>
			<Routes>
				<Route path="/loading" element={<Loading />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/setup/step-1" element={<SetupStepOne />} />
				<Route path="/setup/step-2" element={<SetupStepTwo />} />
				<Route path="/setup/step-3" element={<SetupStepThree />} />
				<Route path="/setup/step-4" element={<SetupStepFour />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</main>
	);
}

export default App;
