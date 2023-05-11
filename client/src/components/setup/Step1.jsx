import Avatar from '../design/Avatar';
import { useState } from 'react';

function SetupStepOne( { nextStep, previousStep } ) {
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
		<>
			<h1>Set your profile</h1>

			<Avatar />

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
				<button onClick={()=>nextStep( 2 )} className="btn-sm">Next</button>
			</div>

		</>
	);
}

export default SetupStepOne;
