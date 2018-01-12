import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/eventActions';
import URLSearchParams from 'url-search-params';

import CommonLayout from '../../components/layout/CommonPage';
import EventListItem from '../../components/profile/EventListItem';

class MyEventListPage extends Component {

    componentDidMount()
    {
        const { timeFilter, page } = this.props;

        this.props.actions.getOwnEvents(timeFilter, page);
    }

    render = () => {


        const { events } = this.props;

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

            </CommonLayout>

        );
    }
}

MyEventListPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {

    let queryParams = new URLSearchParams(ownProps.location.search);

    //debugger;
    return {
        events: state.event.ownEvents ? state.event.ownEvents : [],
        eventsTotal: state.event.total ? state.event.total : 0,
        timeFilter: ownProps.match.params.timeFilter,
        page: parseInt(queryParams.get('page') ? queryParams.get('page') : 1)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEventListPage);