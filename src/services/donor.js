import axios from 'axios';
import { successHandler, errorHandler } from './helper';


export const getAllDonors = ( ) => {
    return axios.get( `http://localhost:3000/api/donor/all`,
    {
         headers: {
            'content-type': 'application/json',
            'Authorization': localStorage.getItem( 'token' )
         }
    })
    .then( successHandler )
    .catch( errorHandler )
};

export const searchDonors = ( details ) => {
    return axios.get(`http://localhost:3000/api/donor?bloodGroup=${details.bloodGroup}&city=${details.city}`,
    {
        headers: {
           'content-type': 'application/json',
           'Authorization': localStorage.getItem( 'token' )
        }
   })
    .then( successHandler )
    .catch( errorHandler )
};

export const addDonor = ( details ) => {
    return axios.post( `http://localhost:3000/api/donor`, 
    details,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem( 'token' )
        }
    }
    )
    .then( successHandler )
    .catch( errorHandler ) 
}