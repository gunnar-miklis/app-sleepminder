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
				padding: 30,
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
		// deal with async behavior
		if ( !moods ) return;
		const moodsCopy = moods.slice();

		// NOTE: logic to summarize all values
		// make unique, and sort descanding >> [5,4,3,2,1]
		const moodsUniqueSorted = [...new Set( moodsCopy )].sort( ( a, b ) => b-a );
		// get the total sum for each number of [5,4,3,2,1]
		const moodsSummarized = moodsUniqueSorted.map( ( num ) => moods.join( '' ).split( num ).length-1 );

		// NOTE: draw chart
		setChart(
			{
				labels: ['Great', 'Good', 'Ok', 'Bad', 'Poor'],
				datasets: [
					{
						label: 'Mood',
						data: moodsSummarized,
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
			<h3 className="card-header">Sleep quality overview</h3>
			<div className="card flex-col-center flex-align-center gap-sm">
				<br/>
				{/* NOTE: condition to await async */}
				{chart && <Doughnut options={options} data={chart} /> }
				<br/>
			</div>
		</>
	);
}
