import * as types from '../actions/types';

export default function serverActivityReducer(state = 0, action) {
    switch (action.type)
    {
        case types.SERVER_REQUEST:
            return state + 1;

        case types.SERVER_RESPONSE:
            return state - 1;

        default:
            return state;
    }
}
