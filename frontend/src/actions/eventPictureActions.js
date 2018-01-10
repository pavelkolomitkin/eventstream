import * as types from './types';
import * as serverActions from './serverActions';
import ApiServiceFactory from '../services/ApiServiceFactory';


export function loadAllUnlinkedPictures()
{
    return (dispatch) => {

        dispatch(serverActions.serverRequest());

        const service = ApiServiceFactory.createEventPictureService();
        service.getAllUnlinkedList(
            (pictures) => {
                dispatch(allUnlinkedEventPicturesLoadSuccess(pictures));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(allUnlinkedEventPicturesLoadError(error));
                dispatch(serverActions.serverResponse());
            });

    }
}

export function allUnlinkedEventPicturesLoadSuccess(pictures) {
    return {type: types.EVENT_PICTURES_ALL_UNLINKED_SUCCESS, pictures: pictures};
}

export function allUnlinkedEventPicturesLoadError(error) {
    return { type: types.EVENT_PICTURES_ALL_UNLINKED_ERROR, error: error };
}