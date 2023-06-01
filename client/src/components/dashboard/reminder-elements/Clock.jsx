import './Clock.css';

export default function Clock( { time } ) {
	return (
		<div className='clock flex-col-center flex-align-center gap-sm'>

			<h1>{ time && time.toTimeString().slice( 0, 5 ) }</h1>
			<p className='p-sm'>{ time && time.toDateString() }</p>

		</div>
	);
}
