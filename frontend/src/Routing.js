import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './containers/security/LoginPage';
import RegisterPage from './containers/security/RegisterPage';
import CreateEventPage from './containers/event/CreateEventPage';
import EventDetailsPage from './containers/event/EventDetailsPage';
import MyEventListPage from './containers/event/MyEventListPage';
import EventListPage from './containers/event/EventListPage';
import EditEventPage from './containers/event/EditEventPage';
import PageNotFound from './components/common/PageNotFound';


const Routing = ({isAuthorized}) => {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/notfound" component={PageNotFound} />
            {isAuthorized && <Route exact path="/event/new"  component={CreateEventPage} /> }


            {isAuthorized && <Route path="/event/:id" exact component={EventDetailsPage} /> }
            {isAuthorized && <Route path="/event/:id/edit" exact component={EditEventPage} /> }
            {isAuthorized && <Route path="/event/list/:timeFilter" exact component={EventListPage} /> }
            {isAuthorized && <Route path="/me/myevents/:timeFilter" exact component={MyEventListPage} /> }
            <Route path="*" exact component={PageNotFound} />
        </Switch>
    );
};

Routing.propTypes = {
    isAuthorized: PropTypes.bool.isRequired
};

export default Routing;