const { expressjwt: jwt } = require( 'express-jwt' );

function getTokenFromHeaders( req ) {
	// check if there's a header and 'Bearer' in it
	if ( req.headers.authorization && req.headers.authorization.split( ' ' )[0] === 'Bearer' ) {
		// if yes, get the token and pass it to the next middleware
		const token = req.headers.authorization.split( ' ' )[1];
		return token;
	}
	return null;
}

const isAuthenticated = jwt( {
	secret: process.env.TOKEN_SECRET,
	algorithms: ['HS256'],
	requestProperty: 'payload',
	getToken: getTokenFromHeaders,
} );

module.exports = { isAuthenticated };
