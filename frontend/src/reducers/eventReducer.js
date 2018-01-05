import * as types from '../actions/types';

const eventReducer = (state = {}, action) => {

    switch (action.type)
    {
        case types.EVENT_CREATE_SUCCESS:

            return {...state, eventData: action.eventData};

            break;

        case types.EVENT_CREATE_ERROR:

            return {...state, eventErrors: action.eventErrors};

            break;

        default:

            return state;

            break;
    }

}

export default eventReducer;