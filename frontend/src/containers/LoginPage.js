import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as securityActions from '../actions/securityActions';
import { bindActionCreators } from 'redux';
import SecurityPage from '../components/SecurityPage';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
    state = {
        username: '',
        password: ''
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.props.actions.loginUser(
            this.state.username,
            this.state.password
        );
    }

    onFieldChangeHandler = (event) => {
        const {name, value} = event.target;

        const newState = {};
        newState[name] = value;

        this.setState(newState);
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.loginUserData)
        {
            this.props.history.push('/');
            return false;
        }

        return true;
    }


    render = () => {
        return (
            <SecurityPage>
                <LoginForm
                    error={this.props.error}
                    onSubmitHandler={this.onSubmitHandler}
                    onFieldChangeHandler={this.onFieldChangeHandler}/>

            </SecurityPage>
            );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.security.loginUserError,
        loginUserData: state.security.loginUserData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);