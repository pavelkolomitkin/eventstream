import * as types from '../actions/types';

const eventReducer = (state = {}, action) => {

    switch (action.type)
    {
        case types.EVENT_CREATE_SUCCESS:

            return {...state, createdEvent: action.eventData};

            break;

        case types.EVENT_CREATE_ERROR:

            return {...state, createEventError: action.eventErrors, createdEvent: null};

            break;

        case types.EVENT_LIST_LOAD_SUCCESS:

            return {...state, events: action.events, eventsTotal: action.total, page: action.page};

            break;

        case types.EVENT_LIST_LOAD_ERROR:

            return {...state, eventsError: action.error, page: action.page};

            break;

        case types.EVENTS_OWN_LIST_LOAD_SUCCESS:

            return {...state, events: action.events, page: action.page, eventsTotal: action.total};

            break;

        case types.EVENTS_OWN_LIST_LOAD_ERROR:

            return {...state, ownEventsError: action.error, page: action.page};

            break;

        case types.EVENT_GET_SUCCESS:

            return {...state, event: action.event, eventGetError: null};

            break;

        case types.EVENT_GET_ERROR:

            return {...state, event: null, eventGetError: action.error};

            break;

        case types.EVENT_GET_OWN_SUCCESS:

            return {...state, ownEvent: action.event};

            break;


        case types.EVENT_GET_OWN_ERROR:

            return {...state, ownEventError: action.error};

            break;

        case types.EVENT_UPDATE_SUCCESS:

            return {...state, event: action.event, updateEventErrors: null};

            break;

        case types.EVENT_UPDATE_ERROR:

            return {...state, event: null, updateEventErrors: action.error};

            break;

        default:

            return state;

            break;
    }

}

export default eventReducer;