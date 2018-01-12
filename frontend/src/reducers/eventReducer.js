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

        case types.EVENTS_OWN_LIST_LOAD_SUCCESS:

            return {...state, ownEvents: action.events, page: action.page, eventsTotal: action.total};

            break;

        case types.EVENTS_OWN_LIST_LOAD_ERROR:

            return {...state, ownEventsError: action.error, page: action.page};

            break;

        default:

            return state;

            break;
    }

}

export default eventReducer;