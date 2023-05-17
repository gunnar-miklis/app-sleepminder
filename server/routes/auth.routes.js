const router = require( 'express' ).Router();
const UserModel = require( '../models/User.model' );
const bcrypt = require( 'bcryptjs' );
const saltRounds = 10;
const jwt = require( 'jsonwebtoken' );
const { isAuthenticated } = require( '../middleware/jwt.middleware' );
const { jwtExpired } = require( '../middleware/jwt-expired.middleware' );

// NOTE: Signup User
router.post( '/signup', ( req, res, next ) => {
	// recieve data on submit
	const { username, password, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = req.body;

	// NOTE: Validations
	// check if username and password ist provided
	if ( username === '' || password === '' ) {
		res.status( 400 ).json( { message: 'Provide a Username and a Password' } );
		return;
	}

	// validate password
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if ( !passwordRegex.test( password ) ) {
		res.status( 400 ).json( { message: 'Password musst have: lowercase, uppercase, at least 6 characters' } );
		return;
	}

	// check if username already exist
	UserModel.findOne( { username } )
		.then( ( foundUser ) => {
			if ( foundUser ) {
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

			const user = { username, password: hash, birth: new Date( birth ), gender, weight, height, wakeTime, bedTime, sleepTips, caffeine, alcohol, moods: [] };

			// NOTE: create new User
			return UserModel.create( user );
		} )
		.then( ( createdUser ) => {
			res.status( 201 ).json( { user: createdUser } );
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

// NOTE: login
router.post( '/login', ( req, res, next ) => {
	const { username, password } = req.body;

	// NOTE: Validations
	// check if username and password ist provided
	if ( username === '' || password === '' ) {
		res.status( 400 ).json( { message: 'Provide Username and Password.' } );
		return;
	}

	UserModel.findOne( { username: username } )
		.then( ( foundUser ) => {
			// check if user is in database
			if ( !foundUser ) {
				res.status( 400 ).json( { message: 'Wrong Credentials' } );
				return;
			}

			// if user found in database check if password and hash matches
			const passwordIsCorrect = bcrypt.compareSync( password, foundUser.password );

			const user = {
				_id: foundUser._id,
				username: foundUser.username,
			};
			if ( passwordIsCorrect ) {
				// NOTE: create token
				const payload = user;
				const authToken = jwt.sign(
					payload,
					process.env.TOKEN_SECRET,
					{
						algorithm: 'HS256',
						expiresIn: '1h',
					},
				);
				// pass created token to frontend
				res.status( 200 ).json( { authToken } );
			} else {
				res.status( 400 ).json( { message: 'Wrong Credentials' } );
			}
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

// NOTE: verify user / token on protected frontend routes
router.get( '/verify', isAuthenticated, jwtExpired, ( req, res, next ) => {
	res.status( 200 ).json( req.payload );
} );

module.exports = router;
