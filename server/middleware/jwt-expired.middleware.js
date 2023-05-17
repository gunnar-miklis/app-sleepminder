function jwtExpired( err, req, res, next ) {
	console.log( 'err server token expired:>> ', err );
	if ( err.name === 'UnauthorizedError' && err.message === 'jwt expired' ) {
		res.status( 401 ).json( { error: 'token expired' } );
		return;
	}
}

module.exports = { jwtExpired };
