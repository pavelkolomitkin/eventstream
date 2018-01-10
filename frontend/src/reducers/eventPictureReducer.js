import * as types from '../actions/types';

const eventPictureReducer = (state = {}, action) => {
    switch (action.type)
    {
        case types.EVENT_PICTURES_ALL_UNLINKED_SUCCESS:

            return {
                ...state, unlinkedPictures: action.pictures
            };

            break;

        case types.EVENT_PICTURES_ALL_UNLINKED_ERROR:

            return {
                ...state, unlinkedPicturesError: action.error
            };

            break;

        default:
            return state;
    }
};

export default eventPictureReducer;