// import axios from 'axios';

// export const USERSAPI = axios.create({
//   baseURL : "https://www.istay.site/api/"
// })

import axios from 'axios';
import Cookies from 'js-cookie'; // Import the library you're using to manage cookies

export const USERSAPI = axios.create({
  baseURL: "https://www.istay.site/api/",
});

// Get the token from the cookie
const token = Cookies.get('user_JWT_token');

// Set the default Authorization header for USERSAPI
USERSAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Now, every request made with USERSAPI will include the Authorization header with the token
