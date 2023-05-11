import './Step3.css';
import { useState } from 'react';

function SetupStepThree( { nextStep, previousStep } ) {
	const [meditation, setMeditation] = useState( false );
	const [read, setRead] = useState( 'Read' );
	const [sounds, setSounds] = useState( 'Sounds/Music' );
	const [yoga, setYoga] = useState( 'Yoga' );
	const [sex, setSex] = useState( 'Sex' );
	const [lavender, setLavender] = useState( 'Lavender' );
	const [shower, setShower] = useState( 'Shower' );

	function handleSubmit( e ) {
		return;
	}

	return (
		<>

			<div>
				<h1>Get sleep tips that fit you</h1>
				<p>Understanding what helps you fall asleep by checking the matching options.</p>
			</div>

			<form onSubmit={handleSubmit} className='sleep-tips'>
				<div>
					<input id='meditation' type="checkbox" value={meditation} onChange={( e )=>setMeditation( !meditation ? true : false )} />
					<label htmlFor='meditation' className='btn-sm'>Meditation</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
				<div>
					<input id='read' type="checkbox" value={read} onChange={( e )=>setRead( !read ? true : false )} />
					<label htmlFor='read' className='btn-sm'>Read</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
				<div>
					<input id='sounds' type="checkbox" value={sounds} onChange={( e )=>setSounds( !sounds ? true : false )} />
					<label htmlFor='sounds' className='btn-sm'>Sounds</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
				<div>
					<input id='yoga' type="checkbox" value={yoga} onChange={( e )=>setYoga( !yoga ? true : false )} />
					<label htmlFor='yoga' className='btn-sm'>Yoga</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
				<div>
					<input id='sex' type="checkbox" value={sex} onChange={( e )=>setSex( !sex ? true : false )} />
					<label htmlFor='sex' className='btn-sm'>Sex</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
				<div>
					<input id='lavender' type="checkbox" value={lavender} onChange={( e )=>setLavender( !lavender ? true : false )} />
					<label htmlFor='lavender' className='btn-sm'>Lavender</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
				<div>
					<input id='shower' type="checkbox" value={shower} onChange={( e )=>setShower( !shower ? true : false )} />
					<label htmlFor='shower' className='btn-sm'>Shower</label>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="20" height="20" rx="10" fill="#BB86FC"/>
						<path d="M7.76667 15L3 10.1299L5.01067 8.24675L7.76667 10.8279L13.9893 5L16 7.28896L7.76667 15Z" fill="#262134"/>
					</svg>
				</div>
			</form>

			<div className='btn-wrapper'>
				<button onClick={()=>previousStep( 2 )} className="btn-skip">Back</button>
				<button onClick={()=>nextStep( 4 )} className="btn-sm">Next</button>
			</div>

		</>
	);
}

export default SetupStepThree;
