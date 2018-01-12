import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/eventActions';
import URLSearchParams from 'url-search-params';
import Pagination from '../common/Pagination';

import CommonLayout from '../../components/layout/CommonPage';
import EventListItem from '../../components/profile/EventListItem';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

class MyEventListPage extends Component {

    tabIndexes = {
        'all': 0,
        'future': 1,
        'past': 2
    }

    constructor(props, context)
    {
        super(props, context);

    }

    componentDidUpdate(prevProps, prevState)
    {
        const { timeFilter, page } = this.props;
        console.log(timeFilter, page);

        if ((prevProps.timeFilter !== timeFilter) || (prevProps.page !== page)) {
            this.props.actions.getOwnEvents(timeFilter, page);
        }
        else
        {
            window.scrollTo(0, 0);
        }
    }


    componentDidMount()
    {
        const { timeFilter, page } = this.props;

        this.props.actions.getOwnEvents(timeFilter, page);
    }

    getTabIndex = () => {
        return this.tabIndexes[this.props.timeFilter] !== null ? this.tabIndexes[this.props.timeFilter] : 0;
    }

    render = () => {

        const { events, eventsTotal, page, history, eventsPerPage, timeFilter } = this.props;

        return (
            <CommonLayout>
                <AppBar position="static">
                    <Tabs value={this.getTabIndex()} >
                        <Tab label="Все" component={NavLink} to="/me/myevents/all" />
                        <Tab label="Актуальные" component={NavLink} to="/me/myevents/future" />
                        <Tab label="Прошедшие" component={NavLink} to="/me/myevents/past" />
                    </Tabs>
                </AppBar>

                <div className="profile-event-list">

                    {
                        events.length > 0 ?

                            events.map((event) => {
                                return (<EventListItem key={event.id} event={event} />)
                            })

                            : null
                    }

                </div>

                <div>
                    <Pagination
                        urlParameterName="page"
                        history={history}
                        totalItems={eventsTotal}
                        currentPage={page}
                        itemsPerPage={eventsPerPage}
                    />
                </div>
            </CommonLayout>

        );
    }
}

MyEventListPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    //debugger;

    let queryParams = new URLSearchParams(ownProps.location.search);
    return {
        events: state.event.ownEvents ? state.event.ownEvents : [],
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

export default connect(mapStateToProps, mapDispatchToProps)(MyEventListPage);