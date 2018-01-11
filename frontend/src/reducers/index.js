import { combineReducers } from 'redux';

import serverActivity from './serverActivityReducer';
import security from './securityReducer';
import event from './eventReducer';
import eventPicture from './eventPictureReducer';
import video from './videoReducer';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    serverActivity,
    security,
    event,
    eventPicture,
    video,
    routing
});


export default rootReducer;