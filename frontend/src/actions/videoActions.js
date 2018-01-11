import * as types from './types';
import * as serverActions from './serverActions';
import ApiServiceFactory from '../services/ApiServiceFactory';

export function loadAllUnlinkedVideos() {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createVideoService();
        apiService.getAllUnlinkedList(
            (videos) => {
                dispatch(loadAllUnlinkedVideosSuccess(videos));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                dispatch(loadAllUnlinkedVideosError(error));
                dispatch(serverActions.serverResponse());
            }
        );
    }
}

export function createVideo(url) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());

        const apiService = ApiServiceFactory.createVideoService();
        apiService.create(
            url,
            (video) => {

                dispatch(videoCreateSuccess(video));
                dispatch(serverActions.serverResponse());
            },
            (error) => {

                dispatch(videoCreateError(error));
                dispatch(serverActions.serverResponse());
            }
        );
    }
}

export function loadAllUnlinkedVideosSuccess(videos) {
    return { type: types.VIDEOS_ALL_UNLINKED_SUCCESS, videos: videos };
}

export function loadAllUnlinkedVideosError(error) {
    return { type: types.VIDEOS_ALL_UNLINKED_ERROR, error: error };
}

export function videoCreateSuccess(video) {
    return { type: types.EVENT_CREATE_SUCCESS, video: video };
}

export function videoCreateError(error) {
    return { type: types.EVENT_CREATE_ERROR, error: error };
}

