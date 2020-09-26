import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    userAuthToken: null,
    message: null,
    loading: false
};

const authStart = (state) => {
    return updateObject( state, {
        message: null,
        loading: true
    });
};

const authSuccess = (state, userAuthToken, message) => {
    return updateObject( state, {
        userAuthToken: userAuthToken,
        message: message,
        loading: false
    } );
};

const authFail = (state, message) => {
    return updateObject( state, {
        message: message,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { userAuthToken: null, message: null});
};

const reducer = ( state = initialState, action ) => {

    if(action.type === actionTypes.AUTH_START) return authStart(state);
    if(action.type === actionTypes.AUTH_SUCCESS) return authSuccess(state, action.userAuthToken, action.message);
    if(action.type === actionTypes.AUTH_FAIL) return authFail(state, action.message);
    if(action.type === actionTypes.AUTH_LOGOUT) return authLogout(state);

    return state;
};

export default reducer;