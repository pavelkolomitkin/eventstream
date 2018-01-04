import * as types from '../actions/types';

export default function (state = {}, action) {
    switch (action.type)
    {
        case types.USER_LOGIN_SUCCESS:

            return {...state, loginUserData: action.data };

            break;


        case types.USER_LOGIN_ERROR:

            return {...state, loginUserError: action.error, loginUserData: null };

            break;


        case types.USER_REGISTER_SUCCESS:

            return {...state, registerResult: action.data };

            break;


        case types.USER_REGISTER_ERROR:

            return {...state, registerErrors: action.errors, registerResult: null };

            break;


        case types.USER_LOGOUT:

            return {...state, loginUserData: null, registerResult: null };

            break;

        case types.USER_AUTHORIZED:

            return {...state, authorizedData: types.data };

            break;

        case types.USER_UNAUTHORIZED:

            return {...state, authorizedData: null };

            break;

        default:
            return state;
    }
}