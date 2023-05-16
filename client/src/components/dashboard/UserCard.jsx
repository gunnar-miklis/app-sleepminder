import './UserCard.css';
import Avatar from '../Avatar';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';

export default function UserLgCard( { username, moods } ) {
	const [isLoading, setIsLoading] = useState( true );
	// const [longestStreak, setLongestStreak] = useState(); // COMMENT: future feature

	const [greatNights, setGreatNights] = useState();
	useEffect( () => {
		// deal with async behavior
		if ( !moods ) return;
		const moodsCopy = moods.slice();

		// NOTE: logic to summarize all 'great' values
		// get all 'Great' moods and count the amount
		const moodsFilteredByGreat = moodsCopy.filter( ( mood ) => mood === 5 ).length;

		setGreatNights( moodsFilteredByGreat );

		setIsLoading( false );
	}, [moods] );

	if ( isLoading ) {
		return <Spinner />;
	} else {
		return (
			<div className='user-card'>
				<div className="card flex-col-center gap-sm">
					<Avatar />
					<h1>Hi {username}!</h1>
					<div className='flex-row-center gap-md'>
						<div className='flex-col-between flex-align-center'>
							<div className='flex-row-between flex-align-center gap-sm'>
								<p><strong>{greatNights}</strong></p>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10 13.3333C8.33869 13.3333 7.02269 12.22 6.72803 10.6667H13.272C12.9774 12.22 11.6614 13.3333 10 13.3333Z" fill="#D9FDED"/>
									<path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM5.33333 8H6.66667V6.66667H5.33333V8ZM6 9.33333C5.82319 9.33333 5.65362 9.40357 5.5286 9.5286C5.40357 9.65362 5.33333 9.82319 5.33333 10C5.33333 12.6267 7.37333 14.6667 10 14.6667C12.6267 14.6667 14.6667 12.6267 14.6667 10C14.6667 9.82319 14.5964 9.65362 14.4714 9.5286C14.3464 9.40357 14.1768 9.33333 14 9.33333H6ZM14.6667 8H13.3333V6.66667H14.6667V8Z" fill="#D9FDED"/>
								</svg>
							</div>
							<p className="p-sm">Great Nights</p>
						</div>
						<div style={{ 'borderLeft': '1px solid gray' }}></div>
						<div className='flex-col-between flex-align-center'>
							<p><strong>4 nights</strong></p>
							<p className="p-sm">Longest streak </p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
