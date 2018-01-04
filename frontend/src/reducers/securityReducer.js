import * as types from '../actions/types';

export default function (state = {}, action) {
    switch (action.type)
    {
        case types.USER_LOGIN_SUCCESS:

            return {...state, loginUserData: action.data };

            break;


        case types.USER_LOGIN_ERROR:

            return {...state, loginUserError: action.error };

            break;


        case types.USER_REGISTER_SUCCESS:

            return {...state, registerResult: action.data };

            break;


        case types.USER_REGISTER_ERROR:

            return {...state, registerErrors: action.errors };

            break;


        case types.USER_LOGOUT:

            return {...state, loginUserData: null };

            break;

        default:
            return state;
    }
}