import axios from 'axios';

// DONE: organize/group axios requests in an API-class.
//	each request will call a specific class methods
class ApiService {
	constructor() {
		// connect axios
		this.api = axios.create( {
			baseURL: import.meta.env.VITE_APP_BACKEND_URI || 'http://localhost:3000',
		} );

		// COMMENT: Axios interceptors are functions that are called before an axios request is sent or after a response is received.
		//	They can be used to modify the HTTP request or response object or to perform actions such as logging or authentication...
		//	* Get access to request headers and bodies and response headers.
		//	* Cancel and redirect requests.
		//	* Modify request and response headers.
		this.api.interceptors.request.use( ( config ) => {
			// get token from local storage
			const storedToken = localStorage.getItem( 'authToken' );
			// pass stored token to headers
			if ( storedToken ) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}
			return config;
		} );
	}

	login = ( reqBody ) => {
		return this.api.post( '/auth/login', reqBody );
	};

	signup = ( reqBody ) => {
		return this.api.post( '/auth/signup', reqBody );
	};

	verify = () => {
		return this.api.get( '/auth/verify' );
	};

	dashboard = () => {
		return this.api.get( '/dashboard' );
	};

	user = () => {
		return this.api.get( '/user' );
	};

	updateUser = ( reqBody ) => {
		return this.api.put( '/user', reqBody );
	};

	deleteUser = () => {
		return this.api.delete( '/user' );
	};

	updateMood = ( reqBody ) => {
		return this.api.put( '/user/mood/update', reqBody );
	};
}

// initiate class
const apiService = new ApiService();
export default apiService;
