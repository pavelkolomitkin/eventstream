import * as types from './types';
import * as serverActions from './serverActions';
import ApiServiceFactory from '../services/ApiServiceFactory';

export function create (title, description, timeStart, timeEnd, tags, pictures, videos) {
    return (dispatch) => {

        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.create(
            title,
            description,
            timeStart,
            timeEnd,
            tags,
            pictures,
            videos,
            (data) => {
                dispatch(createEventSuccess(data));
                dispatch(serverActions.serverResponse());
            },
            (errors) => {

                dispatch(createEventError(errors));
                dispatch(serverActions.serverResponse());
            }
        );
    }
}

export function getOwnEvents(timeFilter, page = 1) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.getOwnList(
            timeFilter,
            page,
            (events, total, page) => {
                dispatch(getOwnEventsSuccess(events, total, page));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(getOwnEventsError(error, page));
                dispatch(serverActions.serverResponse());
            }
            );
    }
}

export function getEvents(timeFilter, page = 1) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.getList(
            timeFilter,
            page,
            (events, total, page) => {
                dispatch(getEventsSuccess(events, total, page));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(getEventsError(error, page));
                dispatch(serverActions.serverResponse());
            }
        );
    }
}

export function getEvent(id) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.get(
            id,
            (event) => {
                dispatch(getEventSuccess(event));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(getEventError(error));
                dispatch(serverActions.serverResponse());
            }
        );
    }
}

export function getOwnEvent(id) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.getOwn(
            id,
            (event) => {
                dispatch(getOwnEventSuccess(event));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(getOwnEventError(error));
                dispatch(serverActions.serverResponse());
            }
        );
    }
}

export function updateEvent(event) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.update(
            event,
            (event) => {
                dispatch(updateEventSuccess(event));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(updateEventError(error));
                dispatch(serverActions.serverResponse());
            }
        )
    }
}

export function addMeMemberToEvent(id) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.addMeMember(
            id,
            (event) => {
                dispatch(addMeMemberSuccess(event));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(addMeMemberError(error));
                dispatch(serverActions.serverResponse());
            }
        )
    }
}

export function removeMeMemberFromEvent(id) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createEventService();
        apiService.removeMeMember(
            id,
            (event) => {
                dispatch(removeMeMemberSuccess(event));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(removeMeMemberError(error));
                dispatch(serverActions.serverResponse());
            }
        )
    }
}

export function createEventSuccess(data) {
    return { type: types.EVENT_CREATE_SUCCESS, eventData: data };
}

export function createEventError(errors) {
    return { type: types.EVENT_CREATE_ERROR, eventErrors: errors };
}

export function getOwnEventsSuccess(events, total, page) {
    return { type: types.EVENTS_OWN_LIST_LOAD_SUCCESS, events: events, total:total, page: page };
}

export function getOwnEventsError(error, page) {
    return { type: types.EVENTS_OWN_LIST_LOAD_ERROR, error: error, page: page };
}

export function getEventsSuccess(events, total, page) {
    return { type: types.EVENT_LIST_LOAD_SUCCESS, events: events, total:total, page: page };
}

export function getEventsError(error, page) {
    return { type: types.EVENT_LIST_LOAD_ERROR, error: error, page: page };
}

export function getEventSuccess(event) {
    return { type: types.EVENT_GET_SUCCESS, event: event };
}

export function getEventError(error) {
    return { type: types.EVENT_GET_ERROR, error: error };
}

export function getOwnEventSuccess(event) {
    return { type: types.EVENT_GET_OWN_SUCCESS, event: event };
}

export function getOwnEventError(error) {
    return { type: types.EVENT_GET_OWN_ERROR, error: error };
}

export function updateEventSuccess(event) {
    return { type: types.EVENT_UPDATE_SUCCESS, event: event };
}

export function updateEventError(error) {
    return { type: types.EVENT_UPDATE_ERROR, error: error };
}

export function addMeMemberSuccess(event) {
    return { type: types.EVENT_ADD_MEMBER_SUCCESS, event: event };
}

export function addMeMemberError(error) {
    return { type: types.EVENT_ADD_MEMBER_ERROR, error: error };
}

export function removeMeMemberSuccess(event) {
    return { type: types.EVENT_REMOVE_MEMBER_SUCCESS, event: event };
}

export function removeMeMemberError(error) {
    return { type: types.EVENT_REMOVE_MEMBER_ERROR, error: error };
}