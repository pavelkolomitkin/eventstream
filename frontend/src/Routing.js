import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './containers/security/LoginPage';
import RegisterPage from './containers/security/RegisterPage';
import CreateEventPage from './containers/event/CreateEventPage';
import EventDetailsPage from './containers/event/EventDetailsPage';
import MyEventListPage from './containers/profile/MyEventListPage';

const Routing = (props) => {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/event/new" component={CreateEventPage} />
            <Route path="/event/:id" component={EventDetailsPage} />
            <Route path="/me/myevents/:timeFilter" exact component={MyEventListPage} />
        </Switch>
    );
};

Routing.propTypes = {};

export default Routing;