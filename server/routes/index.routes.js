const router = require( 'express' ).Router();

router.get( '/', ( req, res, next ) => {
	// res.json( 'All good in here' );
	res.send( '<img src=\'https://i.kym-cdn.com/photos/images/original/001/401/347/312.jpg\' alt=\'all good in here\'/>' );
} );

module.exports = router;
