import axios from 'axios';
import { successHandler, errorHandler } from './helper';

export const getAllRequest = () => {
    return axios.get(`http://localhost:3000/api/allrequester`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem( 'token')
        }
    })
    .then( successHandler)
    .catch( errorHandler )
};

export const requestById = ( id ) => {
    return axios.get(`http://localhost:3000/api/requester/${id}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem( 'token')
        }
    })
    .then( successHandler )
    .catch ( errorHandler )
};


export const searchRequest = ( parameters ) => {
    return axios.get( `http://localhost:3000/api/requester?timezone=${parameters.timeZone}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem( 'token')
        }
    } )
    .then( successHandler )
    .catch( errorHandler )
}

export const deleteRequest = ( id ) => {
    return axios.delete( `http://localhost:3000/api/requester/${id}`,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem( 'token')
        }
    })
    .then( successHandler )
    .catch( errorHandler )
}


