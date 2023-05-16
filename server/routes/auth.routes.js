const router = require( 'express' ).Router();
const UserModel = require( '../models/User.model' );
const bcrypt = require( 'bcryptjs' );
const saltRounds = 10;
const jwt = require( 'jsonwebtoken' );
const { isAuthenticated } = require( '../middleware/jwt.middleware' );

// NOTE: Signup User
router.post( '/signup', ( req, res, next ) => {
	console.log( 'req.body server signup :>> ', req.body );
	// recieve data on submit
	const { username, password, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = req.body;

	// NOTE: Validations
	// check if username and password ist provided
	if ( username === '' || password === '' ) {
		console.log( 'provide username and password' );
		res.status( 400 ).json( { message: 'Provide a Username and a Password' } );
	}

	// validate password
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if ( !passwordRegex.test( password ) ) {
		console.log( 'pw requirements not fullfilled' );
		res.status( 400 ).json( { message: 'Password musst have: lowercase, uppercase, at least 6 characters' } );
		return;
	}

	// check if username already exist
	UserModel.findOne( { username } )
		.then( ( foundUser ) => {
			if ( foundUser ) {
				console.log( 'username already taken' );
				res.status( 400 ).json( { message: 'Username already taken' } );
				return;
			}

			const salt = bcrypt.genSaltSync( saltRounds );
			const hash = bcrypt.hashSync( password, salt );

			// calculate bedTime from wakeTime
			const date = new Date();
			const [hh, mm] = wakeTime.split( ':' );
			date.setHours( hh );
			date.setMinutes( mm );
			date.setSeconds( 0 );
			date.setHours( date.getHours() - 8 );
			const bedTime = date.getHours().toString().padStart( 2, '0' ) + ':' + date.getMinutes().toString().padStart( 2, '0' );

			const user = { username, password: hash, birth, gender, weight, height, wakeTime, bedTime, sleepTips, caffeine, alcohol, moods: [] };

			// NOTE: create new User
			return UserModel.create( user );
		} )
		.then( ( createdUser ) => {
			console.log( 'createdUser :>> ', createdUser );

			res.status( 201 ).json( { user: createdUser } );
		} )
		.catch( ( err ) => {
			console.log( 'err server signup :>> ', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

// NOTE: login
router.post( '/login', ( req, res, next ) => {
	console.log( 'req.body :>> ', req.body );
	const { username, password } = req.body;

	// NOTE: Validations
	// check if username and password ist provided
	if ( username === '' || password === '' ) {
		console.log( 'provide username and password' );
		res.status( 400 ).json( { message: 'Provide Username and Password.' } );
	}

	UserModel.findOne( { username: username } )
		.then( ( foundUser ) => {
			// check if user is in database
			if ( !foundUser ) {
				console.log( 'user not found in db' );
				res.status( 400 ).json( { message: 'User not found.' } );
				return;
			}

			// if user found in database check if password and hash matches
			const passwordIsCorrect = bcrypt.compareSync( password, foundUser.password );

			const user = {
				_id: foundUser._id,
				username: foundUser.username,
			};
			if ( passwordIsCorrect ) {
				console.log( 'password is correct ' );
				// NOTE: create token
				const payload = user;
				const authToken = jwt.sign(
					payload,
					process.env.TOKEN_SECRET,
					{ algorithm: 'HS256', expiresIn: '6h' },
				);
				// pass created token to frontend
				res.status( 200 ).json( { authToken } );
			}
		} )
		.catch( ( err ) => {
			console.log( 'err server login :>> ', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

// verify user / token on protected frontend routes
router.get( '/verify', isAuthenticated, ( req, res, next ) => {
	console.log( 'verify: req.payload :>> ', req.payload );
	res.status( 200 ).json( req.payload );
} );

module.exports = router;
