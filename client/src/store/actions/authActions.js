//return actionTypes for redux

import axios from 'axios';
import cookies from 'js-cookie';
import * as actionTypes from './actionTypes';


// auth start
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

// auth success
export const authSuccess = (userAuthToken, message) => {
    //stores the token into the browser
    //JSON.stringify(userAuthToken): since local storage does not support OBJECT,
    // so turn into string
    localStorage.setItem('userAuthToken', JSON.stringify(userAuthToken));
    return {
        type: actionTypes.AUTH_SUCCESS,
        userAuthToken: userAuthToken,
        message: message
    };
};


// do this at the start of the web page if SSO cookies are found
const authSSOFound = (userAuthCookie, userRefreshCookie) => {

    return dispatch => {

        //remove the auth cookie form browser
        cookies.remove('auth');
        cookies.remove('refresh');

        //const url = 'http://localhost:5000/api/users/authenticate';
        const url = '/api/users/authenticate';


        axios.get(url, {
            headers: {
                'Authorization': "Bearer " + userAuthCookie
            }
        })
            .then(response => {
                console.log(response);
                const authToken = {
                    ...response.data.userInfo,
                    token : userAuthCookie,
                    refresh_token: userRefreshCookie
                }

                dispatch(authSuccess(authToken, response.data.message));
            })
            .catch(error => {
                console.log(error.response.data.message);
                dispatch(authFail(error.response.data.message));
            });
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

        //const url = 'http://localhost:5000/api/users/login';
        const url = '/api/users/login';

        axios.post(url, data)
            .then(response => {
                dispatch(authSuccess(response.data.userAuthToken, response.data.message));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.message));
            });
    };
};

// auth start
export const authLogout = () => {
    //removes the token from the browser
    localStorage.removeItem('userAuthToken');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

//check if the token is stores into the local storage at the start of the website
export const authCheckState = () => {
    return dispatch => {
        //get the token from local storage
        const userAuthToken = localStorage.getItem('userAuthToken');

        const userAuthCookie = cookies.get('auth');
        const userRefreshCookie = cookies.get('refresh');


        if(userAuthCookie && userRefreshCookie){
            dispatch(authSSOFound(userAuthCookie, userRefreshCookie));
        }else if(userAuthToken){
            //JSON.parse(userAuthToken): since local storage does not support OBJECT,
            // so transform string to object
            dispatch(authSuccess(JSON.parse(userAuthToken), ''));
        }else{
            dispatch(authLogout());
        }
    };
};

//temp function
export const authTokenVerify = (userAuthToken) => {
    if(!userAuthToken){
        return false;
    }

    const url = 'http://localhost:5000/api/users/authenticate';

    axios.get(url, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': "Bearer " + userAuthToken.token
        }})
        .then( (res) => {
                return true;
            })
        .catch( (error) => {
            return false;
        })
}

