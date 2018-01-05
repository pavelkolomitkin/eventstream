import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class EventDetailsPage extends Component {

    render = () => {
        return (
            <div>
                <h2>Event Details Page</h2>
            </div>);
    }
}

EventDetailsPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        /* Add new props to component from state */
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);