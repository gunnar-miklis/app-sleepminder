import './StepOne.css';
import Avatar from '../Avatar';
import { useState } from 'react';

export default function StepOne( { handleStepOneSubmit } ) {
	// username
	const [username, setUsername] = useState();
	const [nameIsValid, setNameIsValid] = useState();
	function handleUsername( e ) {
		if ( e.target.value ) {
			setUsername( e.target.value );
			setNameIsValid( 'valid' );
		} else {
			setUsername();
			setNameIsValid();
		}
	}

	// password
	const [password, setPassword] = useState();
	const [passwordIsValid, setPasswordIsValid] = useState();
	function handlePassword( e ) {
		if ( e.target.value ) {
			setPassword( e.target.value );
			setPasswordIsValid( 'valid' );
		} else {
			setPassword();
			setPasswordIsValid();
		}
	}
	// password live check
	// const [pwDigit, setPwDigit] = useState( '' );
	// const [pwLower, setPwLower] = useState( '' );
	// const [pwUpper, setPwUpper] = useState( '' );
	// const [pwLength, setPwLength] = useState( '' );
	// const pwRegExDigit = /(?=.*\d)/;
	// const pwRegExLower = /(?=.*[a-z])/;
	// const pwRegExUpper = /(?=.*[A-Z])/;
	// const pwRegExLength = /(?=.*).{6,}/;
	// if ( pwRegExDigit.test( password ) ) {
	// 	setPwDigit( 'checked' );
	// }
	// if ( pwRegExLower.test( password ) ) {
	// 	setPwLower( 'checked' );
	// }
	// if ( pwRegExUpper.test( password ) ) {
	// 	setPwUpper( 'checked' );
	// }
	// if ( pwRegExLength.test( password ) ) {
	// 	setPwLength( 'checked' );
	// }

	// birth
	const [birth, setBirth] = useState();
	const [birthIsValid, setBirthIsValid] = useState();
	const [inputType, setInputType] = useState( 'text' );
	function handleBirth( e ) {
		if ( e.target.value ) {
			setBirth( e.target.value );
			setBirthIsValid( 'valid' );
		} else {
			setBirth();
			setBirthIsValid();
		}
	}

	// gender
	const genders = ['What best describes your gender?', 'female', 'male', 'diverse'];
	const [gender, setGender] = useState( genders[0] );
	const [genderIsValid, setGenderIsValid] = useState();
	function handleGender( e ) {
		if ( e.target.value && e.target.value !== genders[0] ) {
			setGender( e.target.value );
			setGenderIsValid( 'valid' );
		} else {
			setGender();
			setGenderIsValid();
		}
	}

	// weight
	const [weight, setWeight] = useState();
	const [weightIsValid, setWeightIsValid] = useState();
	function handleWeight( e ) {
		if ( e.target.value < 0 ) setWeight( false );
		else {
			if ( e.target.value ) {
				setWeight( e.target.value );
				setWeightIsValid( 'valid' );
			} else {
				setWeight();
				setWeightIsValid();
			}
		}
	}

	// height
	const [height, setHeight] = useState();
	const [heightIsValid, setHeightIsValid] = useState();
	function handleHeight( e ) {
		if ( e.target.value < 0 ) setHeight( false );
		else {
			if ( e.target.value ) {
				setHeight( e.target.value );
				setHeightIsValid( 'valid' );
			} else {
				setHeight();
				setHeightIsValid();
			}
		}
	}

	return (
		<>
			<h1>Set your profile</h1>

			<Avatar />

			<form onSubmit={handleStepOneSubmit} className='flex-col-between flex-align-center gap-md'>
				<input
					type="text"
					value={username}
					onChange={handleUsername}
					placeholder="Username"
					className={nameIsValid}
				/>
				<input
					type="password"
					value={password}
					onChange={handlePassword}
					placeholder="Password"
					className={passwordIsValid} />
				{/* <ul>
					<li className={pwLower}>lowercase</li>
					<li className={pwUpper}>UPPERCASE</li>
					<li className={pwDigit}>Number123</li>
					<li className={pwLength}>Length: 6+</li>
				</ul> */}
				<input
					type={inputType}
					onFocus={()=> setInputType( 'date' )}
					value={birth}
					onChange={handleBirth}
					placeholder="Day of birth (dd/mm/yyyy)"
					className={birthIsValid} />
				<select
					onChange={handleGender}
					className={genderIsValid}>
					{
						genders.map( ( value, i ) => {
							if ( i === 0 ) {
								return <option value={value} key={value} disabled selected>{value}</option>;
							}
							return <option value={value} key={value}>{value}</option>;
						} )
					}
				</select>
				<input
					type="number"
					value={weight}
					onChange={handleWeight}
					placeholder="Weight (kg)"
					className={weightIsValid} />
				<input
					type="number"
					value={height}
					onChange={handleHeight}
					placeholder="Height (cm)"
					className={heightIsValid} />

				<button type='submit' className="btn-sm">Next</button>
			</form>

		</>
	);
}
