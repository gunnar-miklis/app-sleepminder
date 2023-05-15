import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register( ArcElement, Tooltip, Legend );

// NOTE: set chart.js options and custom hover bevhavior
export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: true,
			position: 'bottom',
			align: 'center',
			labels: {
				usePointStyle: true,
				pointStyle: 'circle',
				color: '#F5F2FF',
				padding: 20,
			},
			onHover: handleHover,
			onLeave: handleLeave,
		},
	},
	title: {
		display: false,
	},
};

// Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover( evt, item, legend ) {
	legend.chart.data.datasets[0].backgroundColor.forEach( ( color, index, colors ) => {
		colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
	} );
	legend.chart.update();
}
// Removes the alpha channel from background colors
function handleLeave( evt, item, legend ) {
	legend.chart.data.datasets[0].backgroundColor.forEach( ( color, index, colors ) => {
		colors[index] = color.length === 9 ? color.slice( 0, -2 ) : color;
	} );
	legend.chart.update();
}

export default function DoughnutChartCard( { moods } ) {
	const [chart, setChart] = useState();
	useEffect( () => {
		// NOTE: draw chart, when async 'moods' is ready
		setChart(
			{
				labels: ['Great', 'Good', 'Ok', 'Bad', 'Poor'],
				datasets: [
					{
						label: 'Mood',
						data: [1, 2, 1, 2, 1],
						backgroundColor: [
							'#D9FDED',
							'#BB86FC',
							'#F5F2FF',
							'#C3C0CE',
							'#262134',
						],
						borderWidth: 0,
					},
				],
			},
		);
	}, [moods] );

	return (
		<>
			<div className='flex-row-between flex-align-baseline'>
				<h3 className="card-header">Sleep quality overview</h3>
				<p className='p-sm' style={{ 'color': '#D9FDED', 'textDecoration': 'underline' }}>Last 7 days</p>
			</div>
			<div className="card flex-col-center flex-align-center gap-md">
				<br/>
				{/* NOTE: condition to await async */}
				{chart && <Doughnut options={options} data={chart} /> }
			</div>
		</>
	);
}
