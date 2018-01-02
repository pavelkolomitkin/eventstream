import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LoginPageComponent from '../components/LoginPage';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {

    render = () => {
        return (
            <LoginPageComponent />
            );
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