//return actionTypes for redux

import axios from 'axios';
import * as actionTypes from './actionTypes';


// auth start
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

// auth success
export const authSuccess = (userAuthToken, message) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userAuthToken: userAuthToken,
        message: message
    };
};

// auth fail
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        message: error
    };
};

//  request for auth from backend
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password
        };

        const url = 'http://localhost:5000/api/users/login'

        axios.post(url, data)
            .then(response => {
                //console.log(response);
                dispatch(authSuccess(response.data.userAuthToken, response.data.message));
            })
            .catch(error => {
                //console.log(err);
                //when code 401 is fix, manually add error message
                //dispatch(authFail(error.message));
                dispatch(authFail('temp message: email or pw is incorrect or both!!'));
            });
    };
};

