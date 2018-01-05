import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HeaderComponent from '../../components/common/Header';
import SessionManager from '../../services/SessionManager';

import * as securityActions from '../../actions/securityActions';

class Header extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick = () => {
        this.props.actions.userLogout();
        this.props.history.replace('/');
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
    return {
        loading: (state.serverActivity > 0),
        userData: SessionManager.getSessionData()
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);