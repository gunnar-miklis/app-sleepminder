const UserModel = require( '../models/User.model' );

const router = require( 'express' ).Router();

router.get( '/dashboard/user', ( req, res, next ) => {
	// payload._id
	const userId = req.payload._id;
	console.log( 'userId :>> ', userId );
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

module.exports = router;
