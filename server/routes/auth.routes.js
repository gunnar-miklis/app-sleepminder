const router = require( 'express' ).Router();
const UserModel = require( '../models/User.model' );
const bcrypt = require( 'bcryptjs' );
const saltRounds = 10;
const jwt = require( 'jsonwebtoken' );
const { isAuthenticated } = require( '../middleware/jwt.middleware' );
// BUG: const { jwtExpired } = require( '../middleware/jwt-expired.middleware' );


// DONE: signup user
router.post( '/signup', ( req, res ) => {
	// get user data from setup-form submit-body
	const { username, password, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = req.body;

	// DONE: validations
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

	UserModel.findOne( { username } )
		.then( ( foundUser ) => {
			// check if username already exist
			if ( foundUser ) {
				res.status( 400 ).json( { message: 'Username already taken' } );
				return;
			}

			// if all valdations passed, encrypt the password
			const salt = bcrypt.genSaltSync( saltRounds );
			const hash = bcrypt.hashSync( password, salt );

			// create a user object with all data
			const user = {
				username,
				password: hash,
				birth,
				gender,
				weight,
				height,
				wakeTime,
				sleepTips,
				caffeine,
				alcohol,
				moods: [],
			};

			// DONE: create new user
			return UserModel.create( user );
		} )
		.then( () => {
			// sent "successfully created" message to client
			res.status( 201 ).json( { message: 'User successfully created.' } );
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while signup :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


// DONE: login user
router.post( '/login', ( req, res ) => {
	// get user data from login-form submit-body
	const { username, password } = req.body;

	// DONE: validations
	// check if username and password ist provided
	if ( username === '' || password === '' ) {
		res.status( 400 ).json( { message: 'Provide Username and Password.' } );
		return;
	}

	UserModel.findOne( { username: username } )
		.then( ( foundUser ) => {
			// check if user is in database
			if ( !foundUser ) {
				// i don't want to reveal which input is wrong (user/password), so i show the same message in both cases
				res.status( 400 ).json( { message: 'Wrong Credentials' } );
				return;
			}

			// if user found in database check if password and hash matches
			const passwordIsCorrect = bcrypt.compareSync( password, foundUser.password );

			// create a user object with id and username for the token payload
			const user = {
				_id: foundUser._id,
				username: foundUser.username,
			};
			if ( passwordIsCorrect ) {
				// DONE: create token
				const payload = user;
				const authToken = jwt.sign(
					payload,
					process.env.TOKEN_SECRET,
					{
						algorithm: 'HS256',
						expiresIn: '1d',
					},
				);
				// sent created token to the client
				res.status( 200 ).json( { authToken } );
			} else {
				// if the password is not correct, show same message as mentioned above
				res.status( 400 ).json( { message: 'Wrong Credentials' } );
			}
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while login :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


// DONE: verify user-token on protected frontend routes
router.get( '/verify', isAuthenticated, ( req, res ) => {
	res.status( 200 ).json( req.payload );
} );
// BUG: when using my own "jwtExpired" middleware.
//	this method works really great on localhost to delete expired tokens.
//	but on the deployment server this crashes the app somehow.
//	maybe, because there are other tokens stored as well?! idk.
// router.get( '/verify', isAuthenticated, jwtExpired, ( req, res ) => {
// 	res.status( 200 ).json( req.payload );
// } );


module.exports = router;

