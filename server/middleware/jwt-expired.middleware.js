// BUG: when using my own "jwtExpired" middleware.
//	this method works really great on localhost to delete expired tokens.
//	but on the deployment server this crashes the app somehow.
//	maybe, because there are other tokens stored as well?! couldn't figure out in time.

// NOTE: usage explained
// if a token is expired, express-jwt will display an error message by default
// to catch it, the very last middleware can do it with ( err, req, res, next )
// if catched identify by certain keywords: UnauthorizedError and jwt expired
// then sent an error message to the client.
// the client then can validate and delete the token from the browser.

// function jwtExpired( err, req, res, next ) {
// 	if ( err.name === 'UnauthorizedError' && err.message === 'jwt expired' ) {
// 		res.status( 401 ).json( { error: 'token expired' } );
// 		return;
// 	}
// }

// module.exports = { jwtExpired };
