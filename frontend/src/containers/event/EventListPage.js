import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import * as eventActions from '../../actions/eventActions';
import URLSearchParams from 'url-search-params';
import EventListPageBase from './EventListPageBase';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

class EventListPage extends EventListPageBase {

    tabs = ['all', 'future', 'past'];

    constructor(props, context)
    {
        super(props, context);
    }

    getFilter()
    {
        return (
            <AppBar position="static">
                <Tabs value={this.getTabIndex()} >
                    <Tab label="Все" component={NavLink} to="/event/list/all" />
                    <Tab label="Актуальные" component={NavLink} to="/event/list/future" />
                    <Tab label="Прошедшие" component={NavLink} to="/event/list/past" />
                </Tabs>
            </AppBar>
        );
    }

    getHeader()
    {
        return (<h2>Events</h2>);
    }

    loadEvents()
    {
        const { timeFilter, page } = this.props;
        this.props.actions.getEvents(timeFilter, page);
    }

    needLoadEvents(nextProps)
    {
        const { timeFilter, page } = this.props;

        return (nextProps.timeFilter !== timeFilter) || (nextProps.page !== page);
    }


    getTabIndex = () => {
        return this.tabs.indexOf(this.props.timeFilter);
    }
}

EventListPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {

    let queryParams = new URLSearchParams(ownProps.location.search);
    return {
        events: state.event.events,
        eventsTotal: state.event.eventsTotal ? state.event.eventsTotal : 0,
        timeFilter: ownProps.match.params.timeFilter,
        page: parseInt(queryParams.get('page') ? queryParams.get('page') : 1),
        eventsPerPage: 10
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListPage);