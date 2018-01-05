import * as types from './types';
import * as serverActions from './serverActions';

import SecurityService from '../services/api/SecurityService';


export function loginUser(username, password) {

    return (dispatch) => {

        dispatch(serverActions.serverRequest());

        const apiService = new SecurityService();
        apiService.login(
            username,
            password,
            (data) => {
                //dispatch(userLoginSuccess(data));
                dispatch(userAuthorized(data.token));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(userLoginError(error));
                dispatch(serverActions.serverResponse());
            });

    };
}

export function registerUser(username, email, password, passwordRepeat) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = new SecurityService();
        apiService.register(
            username,
            email,
            password,
            passwordRepeat,
            (data) => {
                //dispatch(userRegisterSuccess(data));
                dispatch(userAuthorized(data.token));
                dispatch(serverActions.serverResponse());
            },
            (errors) => {
                dispatch(userRegisterError(errors));
                dispatch(serverActions.serverResponse());
            });

    };
}

export function userLoginSuccess(userData) {
    return {type: types.USER_LOGIN_SUCCESS, data: userData};
}

export function userLoginError(error) {
    return {type: types.USER_LOGIN_ERROR, error: error  };
}

export function userLogout() {
    return {type: types.USER_LOGOUT};
}

export function userRegisterSuccess(userData) {
    return {type: types.USER_REGISTER_SUCCESS, data: userData};
}

export function userRegisterError(errors) {
    return {type: types.USER_REGISTER_ERROR, errors: errors};
}

export function userAuthorized(token) {
    return {type: types.USER_AUTHORIZED, token};
}

export function userUnAuthorized() {
    return { type: types.USER_UNAUTHORIZED, token: null };
}