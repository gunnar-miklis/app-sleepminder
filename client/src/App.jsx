import './App.css';
import { Routes, Route } from 'react-router-dom';
import IsAnon from './components/auth/IsAnon';
import IsPrivate from './components/auth/IsPrivate';
import Welcome from './pages/Welcome';
import Setup from './pages/Setup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';

function App() {
	return (
		<main className='flex-col-evenly flex-align-center'>
			<Routes>
				<Route path="/welcome" element={ <IsAnon> <Welcome /> </IsAnon> } />
				<Route path="/setup" element={ <IsAnon> <Setup /> </IsAnon> } />
				<Route path="/login" element={ <IsAnon> <Login /> </IsAnon> } />
				<Route path="/dashboard" element={ <IsPrivate> <Dashboard /> </IsPrivate> } />
				<Route path='*' element={ <Error /> } />
			</Routes>
		</main>
	);
}

export default App;
