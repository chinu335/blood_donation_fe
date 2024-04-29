import axios from 'axios';
import { successHandler, errorHandler } from './helper';

export const addRequest = ( details ) => {
    return axios.post(`http://localhost:3000/api/requester`,
    details,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem( 'token')
        }
    }
    )
    .then( successHandler )
    .catch( errorHandler )

};