const UserModel = require( '../models/User.model' );

const router = require( 'express' ).Router();

router.get( '/dashboard', ( req, res, next ) => {
	// payload._id
	const userId = req.payload._id;
	// UserModel.findById()
	UserModel.findById( userId )
		.then( ( foundUser ) => {
			// pass data
			const { _id, username, wakeTime, moods } = foundUser;
			res.status( 200 ).json( { _id, username, wakeTime, moods } );
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

router.get( '/user', ( req, res, next ) => {
	const userId = req.payload._id;

	UserModel.findById( userId )
		.then( ( foundUser ) => {
			// pass data
			const { username, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = foundUser;
			res.status( 200 ).json( { username, birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } );
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

router.put( '/user', ( req, res, next ) => {
	const userId = req.payload._id;
	const { birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol } = req.body;

	UserModel.findByIdAndUpdate( userId, { birth, gender, weight, height, wakeTime, sleepTips, caffeine, alcohol }, { new: true } )
		.then( () => {
			res.status( 200 ).json( { message: 'Profile successfully updated.' } );
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

router.delete( '/user', ( req, res, next ) => {
	const userId = req.payload._id;
	UserModel.findByIdAndDelete( userId )
		.then( () => {
			res.status( 200 ).json( { message: 'Profile successfully deleted. You\'ll be redirected shortly.' } );
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

router.put( '/user/mood/update', ( req, res, next ) => {
	const { mood } = req.body;
	// payload._id
	const userId = req.payload._id;

	if ( mood === '' ) {
		res.status( 400 ).json( { message: 'There was an Error' } );
		return;
	}

	UserModel.findByIdAndUpdate( userId, { $push: { moods: mood } }, { new: true } )
		.then( ( updatedUser ) => {
			res.status( 200 ).json( updatedUser.moods );
		} )
		.catch( ( err ) => {
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

module.exports = router;
