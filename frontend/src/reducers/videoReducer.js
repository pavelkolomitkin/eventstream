import * as types from '../actions/types';

const videoReducer = (state = {}, action) => {
    switch (action.type)
    {
        case types.VIDEOS_ALL_UNLINKED_SUCCESS:

            return {
                ...state, unlinkedVideos: action.videos
            };

            break;

        case types.VIDEOS_ALL_UNLINKED_ERROR:

            return {
                ...state, unlinkedVideos: null, videosError: action.error
            };

            break;


        default:

            return state;
    }
}

export default videoReducer;