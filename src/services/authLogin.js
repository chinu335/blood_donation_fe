import axios from 'axios';
import { errorHandler, successHandler } from './helper';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';

// credentials = { email: string, password: string }

export const authLogin = ( credentails ) => {
    return axios.post( `http://localhost:3000/api/login`,
    credentails,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( successHandler )
    .catch( errorHandler )
}

export const authLogout = () => {
    localStorage.removeItem( KEY_TOKEN );
    localStorage.removeItem( KEY_EMAIL );
};


