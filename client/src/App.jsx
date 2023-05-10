import './App.css';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Welcome from './pages/Welcome';
import SetupStepOne from './pages/setup/Step1';
import SetupStepTwo from './pages/setup/Step2';
import SetupStepThree from './pages/setup/Step3';

function App() {
	return (
		<main>
			<Routes>
				<Route path="/start" element={<Start />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/setup/step-1" element={<SetupStepOne />} />
				<Route path="/setup/step-2" element={<SetupStepTwo />} />
				<Route path="/setup/step-3" element={<SetupStepThree />} />
			</Routes>
		</main>
	);
}

export default App;
