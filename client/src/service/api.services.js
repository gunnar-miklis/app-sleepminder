import axios from 'axios';

// NOTE: structure axios requests in class with class methods
class ApiService {
	constructor() {
		// connect axios
		this.api = axios.create( {
			baseURL: import.meta.env.BACKEND_URI || 'http://localhost:2711',
		} );

		// interceptors get called after sending and before recieving
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

	dashboardUser = () => {
		return this.api.get( '/dashboard/user' );
	};

	mood = ( reqBody ) => {
		return this.api.put( '/dashboard/user/mood', reqBody );
	};
}

// initiate class
const apiService = new ApiService();
export default apiService;
