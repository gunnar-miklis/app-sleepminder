import { useState } from 'react';
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

import imgGreat from './../../assets/Great.svg';
const cpGreat = new Image();
cpGreat.src = imgGreat;

import imgGood from './../../assets/Good.svg';
const cpGood = new Image();
cpGood.src = imgGood;

import imgOk from './../../assets/Ok.svg';
const cpOk = new Image();
cpOk.src = imgOk;

import imgBad from './../../assets/Bad.svg';
const cpBad = new Image();
cpBad.src = imgBad;

import imgPoor from './../../assets/Poor.svg';
const cpPoor = new Image();
cpPoor.src = imgPoor;

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

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function LineChartCard() {
	const [chart, setChart] = useState(
		{
			labels,
			datasets: [{
				label: 'Mood',
				data: [2, 4, 4, 5, 3, 3, 1],
				pointStyle: [cpBad, cpGood, cpGood, cpGreat, cpOk, cpOk, cpPoor],
				pointRadius: 10,
				borderColor: '#D9FDED',
				backgroundColor: '#D9FDED22',
				fill: true,
				tension: 0.5,
			}],
		},
	);


	return (
		<>
			<div className='flex-row-between flex-align-baseline'>
				<h3 className="card-header">Sleeping Mood</h3>
				<p className='p-sm' style={{ 'color': '#D9FDED', 'textDecoration': 'underline' }}>Last 7 days</p>
			</div>
			<div className="card flex-col-center flex-align-center">
				<Line
					options={options}
					data={chart}
				/>
			</div>
		</>
	);
}
