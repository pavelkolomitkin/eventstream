import { combineReducers } from 'redux';

import serverActivity from './serverActivityReducer';
import security from './securityReducer';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
    serverActivity,
    security,
    routing
});


export default rootReducer;