import * as types from './types';
import * as serverActions from './serverActions';

import EventService from '../services/api/EventService';
import SessionManager from '../services/SessionManager';

export function create (title, description, timeStart, timeEnd, tags, pictures) {
    return (dispatch) => {

        dispatch(serverActions.serverRequest());

        const apiService = new EventService(SessionManager.getAuthToken());
        apiService.create(
            title,
            description,
            timeStart,
            timeEnd,
            tags,
            pictures,
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

export function createEventSuccess(data) {
    return { type: types.EVENT_CREATE_SUCCESS, eventData: data };
}

export function createEventError(errors) {
    return { type: types.EVENT_CREATE_ERROR, eventErrors: errors };
}