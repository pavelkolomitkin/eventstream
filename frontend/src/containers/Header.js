import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HeaderComponent from '../components/Header';

import * as securityActions from '../actions/securityActions';

class Header extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick = () => {
        this.props.actions.userLogout();
        this.props.history.push('/login');
    }

    render = () => {
        return (
            <HeaderComponent
                loading={this.props.loading}
                userData={this.props.userData}
                onLogoutClick={this.onLogoutClick}
            />
        );
    }
}

Header.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    //debugger;
    return {
        loading: (state.serverActivity > 0),
        userData: state.security.authorizedData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);