import { useEffect, useState } from 'react';

export default function Caffeine( { value } ) {
	const [caffeine, setCaffeine] = useState( false );

	useEffect( ()=> {
		if ( !value ) return;
		setCaffeine( value );
	}, [value] );


	return (
		<>
			<div className="daily-routine">
				<p>Caffeine</p>
				<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.5 7.5C10.5 6.5 11.214 5.5 12.643 5.5C13.4007 5.5 14.1274 5.199 14.6632 4.6632C15.199 4.12741 15.5 3.40072 15.5 2.643V2M6.5 7.5V7C6.5 6.20435 6.81607 5.44129 7.37868 4.87868C7.94129 4.31607 8.70435 4 9.5 4C10.0304 4 10.5391 3.78929 10.9142 3.41421C11.2893 3.03914 11.5 2.53043 11.5 2V1.5M15.5 10.1V13.5C15.5 15.0913 14.8679 16.6174 13.7426 17.7426C12.6174 18.8679 11.0913 19.5 9.5 19.5H7.5C5.9087 19.5 4.38258 18.8679 3.25736 17.7426C2.13214 16.6174 1.5 15.0913 1.5 13.5V10.1C1.5 9.94087 1.56321 9.78826 1.67574 9.67574C1.78826 9.56321 1.94087 9.5 2.1 9.5H14.9C15.0591 9.5 15.2117 9.56321 15.3243 9.67574C15.4368 9.78826 15.5 9.94087 15.5 10.1Z" stroke="#F5F2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				<label className="switch">
					<input type="checkbox" className="toggle" value={caffeine} onChange={( e )=> setCaffeine( !caffeine ? true : false )} checked={caffeine}/>
					<span className="slider round"></span>
				</label>
			</div>

			{ caffeine && (
				<div className="week-days">
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M8.89773 9.36364H11.4773L14.9318 17.7955H15.0682L18.5227 9.36364H21.1023V21H19.0795V13.0057H18.9716L15.7557 20.9659H14.2443L11.0284 12.9886H10.9205V21H8.89773V9.36364Z" fill="#F5F2FF"/>
					</svg>
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M10.3551 11.1307V9.36364H19.6392V11.1307H16.0426V21H13.9517V11.1307H10.3551Z" fill="#F5F2FF"/>
					</svg>
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M10.5419 21L7.25781 9.36364H9.52486L11.6214 17.9148H11.7294L13.968 9.36364H16.0305L18.2749 17.9205H18.3771L20.4737 9.36364H22.7408L19.4567 21H17.3771L15.0476 12.8352H14.9567L12.6214 21H10.5419Z" fill="#F5F2FF"/>
					</svg>
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M10.3551 11.1307V9.36364H19.6392V11.1307H16.0426V21H13.9517V11.1307H10.3551Z" fill="#F5F2FF"/>
					</svg>
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M11.4602 21V9.36364H18.9148V11.1307H13.5682V14.2898H18.4034V16.0568H13.5682V21H11.4602Z" fill="#F5F2FF"/>
					</svg>
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M17.2763 12.5625C17.2232 12.0663 16.9998 11.6799 16.6058 11.4034C16.2157 11.1269 15.7081 10.9886 15.0831 10.9886C14.6437 10.9886 14.2668 11.0549 13.9524 11.1875C13.638 11.3201 13.3975 11.5 13.2308 11.7273C13.0642 11.9545 12.9789 12.214 12.9751 12.5057C12.9751 12.7481 13.0301 12.9583 13.1399 13.1364C13.2536 13.3144 13.407 13.4659 13.6001 13.5909C13.7933 13.7121 14.0073 13.8144 14.2422 13.8977C14.477 13.9811 14.7138 14.0511 14.9524 14.108L16.0433 14.3807C16.4827 14.483 16.9051 14.6212 17.3104 14.7955C17.7195 14.9697 18.085 15.1894 18.407 15.4545C18.7327 15.7197 18.9903 16.0398 19.1797 16.4148C19.3691 16.7898 19.4638 17.2292 19.4638 17.733C19.4638 18.4148 19.2895 19.0152 18.9411 19.5341C18.5926 20.0492 18.0888 20.4527 17.4297 20.7443C16.7744 21.0322 15.9808 21.1761 15.049 21.1761C14.1437 21.1761 13.3577 21.036 12.6911 20.7557C12.0282 20.4754 11.5092 20.0663 11.1342 19.5284C10.763 18.9905 10.5623 18.3352 10.532 17.5625H12.6058C12.6361 17.9678 12.7611 18.3049 12.9808 18.5739C13.2005 18.8428 13.4865 19.0436 13.8388 19.1761C14.1948 19.3087 14.5926 19.375 15.032 19.375C15.4903 19.375 15.8918 19.3068 16.2365 19.1705C16.585 19.0303 16.8577 18.8371 17.0547 18.5909C17.2517 18.3409 17.352 18.0492 17.3558 17.7159C17.352 17.4129 17.263 17.1629 17.0888 16.9659C16.9145 16.7652 16.6702 16.5985 16.3558 16.4659C16.0452 16.3295 15.6816 16.2083 15.2649 16.1023L13.9411 15.7614C12.9827 15.5152 12.2251 15.142 11.6683 14.642C11.1153 14.1383 10.8388 13.4697 10.8388 12.6364C10.8388 11.9508 11.0244 11.3504 11.3956 10.8352C11.7706 10.3201 12.2801 9.92045 12.924 9.63636C13.5679 9.34848 14.2971 9.20455 15.1115 9.20455C15.9373 9.20455 16.6607 9.34848 17.282 9.63636C17.907 9.92045 18.3975 10.3163 18.7536 10.8239C19.1096 11.3277 19.2933 11.9072 19.3047 12.5625H17.2763Z" fill="#F5F2FF"/>
					</svg>
					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="30" height="30" rx="15" fill="#4F4B5D"/>
						<path d="M17.2763 12.5625C17.2232 12.0663 16.9998 11.6799 16.6058 11.4034C16.2157 11.1269 15.7081 10.9886 15.0831 10.9886C14.6437 10.9886 14.2668 11.0549 13.9524 11.1875C13.638 11.3201 13.3975 11.5 13.2308 11.7273C13.0642 11.9545 12.9789 12.214 12.9751 12.5057C12.9751 12.7481 13.0301 12.9583 13.1399 13.1364C13.2536 13.3144 13.407 13.4659 13.6001 13.5909C13.7933 13.7121 14.0073 13.8144 14.2422 13.8977C14.477 13.9811 14.7138 14.0511 14.9524 14.108L16.0433 14.3807C16.4827 14.483 16.9051 14.6212 17.3104 14.7955C17.7195 14.9697 18.085 15.1894 18.407 15.4545C18.7327 15.7197 18.9903 16.0398 19.1797 16.4148C19.3691 16.7898 19.4638 17.2292 19.4638 17.733C19.4638 18.4148 19.2895 19.0152 18.9411 19.5341C18.5926 20.0492 18.0888 20.4527 17.4297 20.7443C16.7744 21.0322 15.9808 21.1761 15.049 21.1761C14.1437 21.1761 13.3577 21.036 12.6911 20.7557C12.0282 20.4754 11.5092 20.0663 11.1342 19.5284C10.763 18.9905 10.5623 18.3352 10.532 17.5625H12.6058C12.6361 17.9678 12.7611 18.3049 12.9808 18.5739C13.2005 18.8428 13.4865 19.0436 13.8388 19.1761C14.1948 19.3087 14.5926 19.375 15.032 19.375C15.4903 19.375 15.8918 19.3068 16.2365 19.1705C16.585 19.0303 16.8577 18.8371 17.0547 18.5909C17.2517 18.3409 17.352 18.0492 17.3558 17.7159C17.352 17.4129 17.263 17.1629 17.0888 16.9659C16.9145 16.7652 16.6702 16.5985 16.3558 16.4659C16.0452 16.3295 15.6816 16.2083 15.2649 16.1023L13.9411 15.7614C12.9827 15.5152 12.2251 15.142 11.6683 14.642C11.1153 14.1383 10.8388 13.4697 10.8388 12.6364C10.8388 11.9508 11.0244 11.3504 11.3956 10.8352C11.7706 10.3201 12.2801 9.92045 12.924 9.63636C13.5679 9.34848 14.2971 9.20455 15.1115 9.20455C15.9373 9.20455 16.6607 9.34848 17.282 9.63636C17.907 9.92045 18.3975 10.3163 18.7536 10.8239C19.1096 11.3277 19.2933 11.9072 19.3047 12.5625H17.2763Z" fill="#F5F2FF"/>
					</svg>
				</div>
			)}
		</>
	);
}
