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

class EventListPageBase extends Component {

    state = {
        events: [],
        eventsTotal: 0,
        page: 1
    };

    constructor(props, context)
    {
        super(props, context);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            events: nextProps.events,
            eventsTotal: nextProps.eventsTotal,
            page: nextProps.page
        });
    }

    getHeader()
    {
        return null
    }

    getFilter()
    {
        return null;
    }

    loadEvents()
    {


    }

    needLoadEvents(prevProps)
    {

    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.needLoadEvents(prevProps)) {

            this.loadEvents();
        }
        else
        {
            window.scrollTo(0, 0);
        }
    }


    componentDidMount()
    {
        this.loadEvents();
    }

    render = () => {

        const { history, eventsPerPage } = this.props;
        const { events, eventsTotal, page } = this.state;

        return (
            <CommonLayout>
                {this.getHeader()}
                {this.getFilter()}

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

EventListPageBase.propTypes = {};

// const mapStateToProps = (state, ownProps) => {
//
//     let queryParams = new URLSearchParams(ownProps.location.search);
//     return {
//         events: state.event.events ? state.event.events : [],
//         eventsTotal: state.event.eventsTotal ? state.event.eventsTotal : 0,
//         page: parseInt(queryParams.get('page') ? queryParams.get('page') : 1),
//         eventsPerPage: 10
//     };
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(eventActions, dispatch)
//     }
// }

export default EventListPageBase;