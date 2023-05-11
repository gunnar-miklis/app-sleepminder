import { Link } from 'react-router-dom';
import './setup.css';
import avatar from '../../assets/avatar.png';
import avatarEdit from '../../assets/avatar-edit.png';
import { useState } from 'react';

function SetupStepOne() {
	const [name, setName] = useState();
	const [nameIsValid, setNameIsValid] = useState();
	const [birth, setBirth] = useState();
	const [birthIsValid, setBirthIsValid] = useState();
	const genders = ['What best describes your gender?', 'female', 'male', 'diverse'];
	const [gender, setGender] = useState( genders[0] );
	const [genderIsValid, setGenderIsValid] = useState();
	const [weight, setWeight] = useState();
	const [weightIsValid, setWeightIsValid] = useState();
	const [height, setHeight] = useState();
	const [heightIsValid, setHeightIsValid] = useState();
	const [inputType, setInputType] = useState( 'text' );

	function handleName( e ) {
		if ( e.target.value ) {
			setName( e.target.value );
			setNameIsValid( 'valid' );
		} else {
			setName();
			setNameIsValid();
		}
	}
	function handleBirth( e ) {
		if ( e.target.value ) {
			setBirth( e.target.value );
			setBirthIsValid( 'valid' );
		} else {
			setBirth();
			setBirthIsValid();
		}
	}
	function handleGender( e ) {
		if ( e.target.value && e.target.value !== genders[0] ) {
			setGender( e.target.value );
			setGenderIsValid( 'valid' );
		} else {
			setGender();
			setGenderIsValid();
		}
	}
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

	function handleSubmit( e ) {
		return;
	}

	return (
		<div className="setup">

			<div className="step-progress-bar">
				<div className="active" data-step="Step 1"></div>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<h1>Set your profile</h1>

			<div className='avatar'>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="10" cy="10" r="9.5" fill="#262134" stroke="#F5F2FF"/>
					<path d="M11.9062 5.37495L10.7344 6.54683L13.0781 8.89058L14.25 7.7187L11.9062 5.37495ZM9.5625 7.7187L4.875 12.4062V14.75H7.21875L11.9062 10.0625L9.5625 7.7187Z" fill="#F5F2FF"/>
				</svg>
				<img src={avatar} alt="avatar" />
			</div>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={handleName}
					placeholder='Name'
					className={nameIsValid} />
				<input
					type={inputType}
					onFocus={()=> setInputType( 'date' )}
					value={birth}
					onChange={handleBirth}
					placeholder='Day of birth (dd/mm/yyyy)'
					className={birthIsValid} />
				<select
					onChange={handleGender}
					className={genderIsValid}>
					{
						genders.map( ( value ) => <option value={value} key={value}>{value}</option> )
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
			</form>

			<div className='btn-wrapper'>
				<div></div>
				<Link to="/setup/step-2" className="btn-sm">Next</Link>
			</div>

		</div>
	);
}

export default SetupStepOne;
