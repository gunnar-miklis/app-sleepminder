export default function WakeBedTime( { wakeTime, bedTime } ) {
	return (
		<div className="flex-row-center gap-xl">
			<p className="p-sm">{wakeTime}</p>
			<p className="p-sm">{bedTime}</p>
		</div>
	);
}
