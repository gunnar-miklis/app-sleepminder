const UserModel = require( '../models/User.model' );

const router = require( 'express' ).Router();

router.get( '/dashboard/user', ( req, res, next ) => {
	// payload._id
	const userId = req.payload._id;
	console.log( 'userId server dashboard:>> ', userId );
	// UserModel.findById()
	UserModel.findById( userId )
		.then( ( foundUser ) => {
			// pass data
			const { _id, username, wakeTime, bedTime, moods } = foundUser;
			res.status( 200 ).json( { _id, username, wakeTime, bedTime, moods } );
		} )
		.catch( ( err ) => {
			console.log( 'err dashboard :>> ', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

router.put( '/dashboard/user/mood', ( req, res, next ) => {
	console.log( 'req.body server add mood :>> ', req.body );
	const { mood } = req.body;
	// payload._id
	const userId = req.payload._id;
	console.log( 'userId server add mood:>> ', userId );

	if ( mood === '' ) {
		res.status( 400 ).json( { message: 'There was an Error' } );
		return;
	}

	UserModel.findByIdAndUpdate( userId, { $push: { moods: mood } }, { new: true } )
		.then( ( updatedUser ) => {
			console.log( 'res server add mood :>> ', res );
			res.status( 200 ).json( updatedUser.moods );
		} )
		.catch( ( err ) => {
			console.log( 'err dashboard :>> ', err );
			res.status( 500 ).json( { message: 'Internal Server Error' } );
		} );
} );

module.exports = router;
