import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class LoginPage extends Component {

    render = () => {
        return (
            <div>
                <h2>This is login page!</h2>
        </div>);
    }
}

LoginPage.propTypes = {

};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);