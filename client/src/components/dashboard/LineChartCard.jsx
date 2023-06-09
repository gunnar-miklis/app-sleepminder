import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
);

// DONE: import images and convert, so chart.js can read them as "point styles"
import imgGreat from './../../assets/moods/Great.svg';
const cpGreat = new Image();
cpGreat.src = imgGreat;

import imgGood from './../../assets/moods/Good.svg';
const cpGood = new Image();
cpGood.src = imgGood;

import imgOk from './../../assets/moods/Ok.svg';
const cpOk = new Image();
cpOk.src = imgOk;

import imgBad from './../../assets/moods/Bad.svg';
const cpBad = new Image();
cpBad.src = imgBad;

import imgPoor from './../../assets/moods/Poor.svg';
import Spinner from '../Spinner';
const cpPoor = new Image();
cpPoor.src = imgPoor;

// DONE: set chart.js options
export const options = {
	responsive: true,
	animations: {
		tension: {
			duration: 1300,
			easing: 'easeInOutSine',
			from: 0.7,
			to: 0.3,
			loop: true,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			ticks: {
				font: {
					weight: 'normal',
				},
				color: '#F5F2FF',
				beginAtZero: true,
				stepSize: 1,
				padding: 10,
			},
			suggestedMin: 1,
			suggestedMax: 5,
		},
		x: {
			ticks: {
				font: {
					weight: 'bold',
				},
				color: '#F5F2FF',
				beginAtZero: true,
			},
			reverse: true,
		},
	},
};

export default function LineChartCard( { moods } ) {
	const [isLoading, setIsLoading] = useState( true );
	const [chart, setChart] = useState();

	useEffect( () => {
		// deal with async behavior
		if ( !moods ) return;
		const moodsCopy = moods.slice();

		// DONE: funcionality to show last 7 entries / days
		// reverse moods, then get entry 0 to seven
		const lastSevenMoods = moodsCopy.reverse().slice( 0, 7 );
		const pointStyles = lastSevenMoods.map( ( mood ) => {
			if ( mood === 5 ) return cpGreat;
			if ( mood === 4 ) return cpGood;
			if ( mood === 3 ) return cpOk;
			if ( mood === 2 ) return cpBad;
			if ( mood === 1 ) return cpPoor;
		} );

		// draw chart
		setChart( {
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			datasets: [{
				label: 'Mood',
				data: lastSevenMoods,
				pointStyle: pointStyles,
				pointRadius: 10,
				borderColor: '#D9FDED',
				backgroundColor: '#D9FDED33',
				fill: true,
			}],
		} );

		setIsLoading( false );
	}, [moods] );

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<>
				{/* card header */}
				<div className='flex-row-between flex-align-baseline'>
					<h3 className="card-header">Sleeping Mood</h3>
					<p className='p-sm' style={{ 'color': '#D9FDED', 'textDecoration': 'underline' }}>Last 7 days</p>
				</div>

				{/* chart */}
				<div className="card flex-col-center flex-align-center">
					{ chart && <Line options={options} data={chart} /> }
				</div>
			</>
		);
	}
}
