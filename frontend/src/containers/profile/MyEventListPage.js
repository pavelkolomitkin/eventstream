import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/eventActions';
import URLSearchParams from 'url-search-params';
import Pagination from '../common/Pagination';

import CommonLayout from '../../components/layout/CommonPage';
import EventListItem from '../../components/profile/EventListItem';

class MyEventListPage extends Component {

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
    }


    componentDidMount()
    {
        const { timeFilter, page } = this.props;

        this.props.actions.getOwnEvents(timeFilter, page);
    }

    render = () => {


        const { events, eventsTotal, page, history, eventsPerPage, timeFilter } = this.props;

        return (
            <CommonLayout>
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
                        // urlBuilder={(pageNumber) => {
                        //     return '/me/myevents/' + timeFilter + '/' + pageNumber;
                        // }}
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