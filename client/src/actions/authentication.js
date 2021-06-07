
//we will send an AJAX request to the node.js server. 
//We can not write this code inside Reducer because otherwise, 
//it is a violation of pure function. 
//So we need to write any database operations from actions.
//we need to save this token and set the current user as a logged in user.
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER  } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

const baseUrl = process.env.STATIC_BASE_URL || "http://localhost:5000";

export const registerUser = (user, history) => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                return {
                    type: GET_ERRORS,
                    payload: err.response.data
                };
            });
}

export const loginUser = (user) => {
    axios.post(`${baseUrl}/api/users/login`, user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                setCurrentUser(decoded);
                window.location.href = '/';
            })
            .catch(err => {
                return {
                    type: GET_ERRORS,
                    payload: err
                };
            });
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}