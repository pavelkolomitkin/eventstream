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

export function createEventSuccess(data) {
    return { type: types.EVENT_CREATE_SUCCESS, eventData: data };
}

export function createEventError(errors) {
    return { type: types.EVENT_CREATE_ERROR, eventErrors: errors };
}

export function getOwnEventsSuccess(events, total, page) {
    return { type: types.EVENTS_OWN_LIST_LOAD_SUCCESS, events: events, total, page: page };
}

export function getOwnEventsError(error, page) {
    return { type: types.EVENTS_OWN_LIST_LOAD_ERROR, error: error, page: page };
}