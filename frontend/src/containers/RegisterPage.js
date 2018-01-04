import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as securityActions from '../actions/securityActions';

import SecurityPage from '../components/SecurityPage';
import RegisterForm from '../components/RegisterForm';

class RegisterPage extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        //debugger;
        this.props.actions.registerUser(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.passwordRepeat
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
        if (nextProps.registerResult)
        {
            this.props.history.push('/');
            return false;
        }

        return true;
    }

    render = () => {
        return (
            <SecurityPage>
                <RegisterForm
                    errors={this.props.errors}
                    onSubmitHandler={this.onSubmitHandler}
                    onFieldChangeHandler={this.onFieldChangeHandler}
                />
            </SecurityPage>);
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        registerResult: state.security.registerResult,
        errors: state.security.registerErrors ? state.security.registerErrors : {}
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);