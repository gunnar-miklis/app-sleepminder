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

// NOTE: import images and convert, so chart.js can read them as point styles
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

// NOTE: set chart.js options
export const options = {
	responsive: true,
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
				steps: 1,
				stepValue: 1,
				max: 5,
			},
		},
		x: {
			ticks: {
				font: {
					weight: 'bold',
				},
				color: '#F5F2FF',
				beginAtZero: true,
			},
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

		// NOTE: logic to show last 7 entries ( aka days )
		// reverse moods, then get entry 0 to seven
		const lastSevenMoods = moodsCopy.reverse().slice( 0, 7 );
		const pointStyles = lastSevenMoods.map( ( mood ) => {
			if ( mood === 5 ) return cpGreat;
			if ( mood === 4 ) return cpGood;
			if ( mood === 3 ) return cpOk;
			if ( mood === 2 ) return cpBad;
			if ( mood === 1 ) return cpPoor;
		} );

		// NOTE: draw chart, when async 'moods' is ready
		setChart( {
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			datasets: [{
				label: 'Mood',
				data: lastSevenMoods,
				pointStyle: pointStyles,
				pointRadius: 10,
				borderColor: '#D9FDED',
				backgroundColor: '#D9FDED22',
				fill: true,
				tension: 0.5,
			}],
		} );

		setIsLoading( false );
	}, [moods] );

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<>
				<div className='flex-row-between flex-align-baseline'>
					<h3 className="card-header">Sleeping Mood</h3>
					<p className='p-sm' style={{ 'color': '#D9FDED', 'textDecoration': 'underline' }}>Last 7 days</p>
				</div>
				<div className="card flex-col-center flex-align-center">
					{/* NOTE: condition to await async */}
					{ chart && <Line options={options} data={chart} /> }
				</div>
			</>
		);
	}
}
