function ReminderCard() {
	return (
		<div className="card flex-col-between">
			<h1>It's still time to...</h1>

			<h3>eating</h3>
			<p>Stop eating heavy meals or snacks at least 2-3 hours before bedtime. This will give your body enough time to digest the food before you go to sleep, which can help prevent discomfort or indigestion that may interfere with your sleep.</p>
			<hr style={{"width": "100%"}}/>

			<h3>coffee</h3>
			<p>Stop consuming caffeine, including coffee, tea, and some sodas, at least 4-6 hours before bedtime. Caffeine is a stimulant that can interfere with your sleep, so it's best to avoid it in the hours leading up to bedtime.</p>
			<hr style={{"width": "100%"}}/>

			<h3>alcohol</h3>
			<p>Stop drinking alcohol at least 3-4 hours before bedtime. While alcohol may make you feel drowsy initially, it can disrupt your sleep later in the night and cause you to wake up feeling tired.</p>
			<hr style={{"width": "100%"}}/>

			<h3>screens</h3>
			<p>Stop using screens, including phones, tablets, and computers, at least 1-2 hours before bedtime. The blue light emitted by screens can interfere with your body's natural sleep cycle and make it harder to fall asleep.</p>
			<hr style={{"width": "100%"}}/>
		
			<q><i>Source: Based on the guidelines provided by health organizations and sleep experts, including the American Sleep Association, the National Sleep Foundation, and the Mayo Clinic.</i></q>
		</div>
	);
}

export default ReminderCard;
