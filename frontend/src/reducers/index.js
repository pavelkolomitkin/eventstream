import { combineReducers } from 'redux';

import serverActivity from './serverActivityReducer';
import security from './securityReducer';
import event from './eventReducer';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    serverActivity,
    security,
    event,
    routing
});


export default rootReducer;