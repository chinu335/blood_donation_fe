import axios from "axios";
axios.defaults.withCredentials = false;
import { successHandler, errorHandler } from './helper';


export const register = ( credentails ) => {
    return axios.post( `http://localhost:3000/api/register`,
    credentails,
    {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then( successHandler )
    .catch( errorHandler )
}