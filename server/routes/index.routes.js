const router = require( 'express' ).Router();


router.get( '/', ( req, res, next ) => {
	// COMMENT: default = json text message
	// res.json( 'All good in here' );

	// COMMENT: my choice = dank memes 🙃 ...ye ye, i know... then it's not REST anymore.
	res.send( '<img src="https://i.kym-cdn.com/photos/images/original/001/401/347/312.jpg" alt="this is fine"/>' );
} );


module.exports = router;
