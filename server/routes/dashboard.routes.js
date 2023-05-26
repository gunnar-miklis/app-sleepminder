const UserModel = require( '../models/User.model' );
const router = require( 'express' ).Router();


// DONE: get and send selected userData for the "dashboard" page
router.get( '/dashboard', ( req, res ) => {
	// get user id from token payload
	const userId = req.payload._id;

	UserModel.findById( userId )
		.then( ( foundUser ) => {
			// send userData from database to client
			const { _id, username, wakeTime, moods } = foundUser;
			res.status( 200 ).json( { _id, username, wakeTime, moods } );
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while getting selected user data :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


// DONE: get all userData for the "Update User" page
router.get( '/user', ( req, res ) => {
	// get user id from token payload
	const userId = req.payload._id;

	UserModel.findById( userId )
		.then( ( foundUser ) => {
			// send userData from database to client
			const { username, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = foundUser;
			res.status( 200 ).json( { username, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } );
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while getting all user data :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


// DONE: update userData
router.put( '/user', ( req, res ) => {
	// get user id from token payload
	const userId = req.payload._id;
	// get user data from update-form submit-body
	const { birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = req.body;

	UserModel.findByIdAndUpdate( userId, { birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol }, { new: true } )
		.then( () => {
			// sent "successfully updated" message to client
			res.status( 200 ).json( { message: 'Profile successfully updated.' } );
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while updating user :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


// DONE: delete user on request
router.delete( '/user', ( req, res ) => {
	// get user id from token payload
	const userId = req.payload._id;

	UserModel.findByIdAndDelete( userId )
		.then( () => {
			// sent "successfully deleted" message to client
			res.status( 200 ).json( { message: 'Profile successfully deleted. You\'ll be redirected shortly.' } );
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while deleting user :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


// DONE: update the mood for the current logged in user on submit
router.put( '/user/mood/update', ( req, res ) => {
	// get user id from token payload
	const userId = req.payload._id;
	// get user data from mood-form submit-body
	const { mood } = req.body;

	// optional: validation if "empty" submit. an empty submit shouldn't even be possible... anyway
	if ( mood === '' ) {
		res.status( 400 ).json( { message: 'There was an Error' } );
		return;
	}

	UserModel.findByIdAndUpdate( userId, { $push: { moods: mood } }, { new: true } )
		.then( ( updatedUser ) => {
			// sent back the updated mood array to the client. so, client can immediatley use it to refresh the dashboard view, after updating.
			res.status( 200 ).json( updatedUser.moods );
		} )
		.catch( ( err ) => {
			console.error( 'ERROR while updating user mood :>>', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );


module.exports = router;
