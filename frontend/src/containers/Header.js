import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import HeaderComponent from '../components/Header';

class Header extends Component {

    render = () => {
        return (
            <HeaderComponent loading={this.props.loading}/>
        );
    }
}

Header.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    //debugger;
    return {
        loading: (state.serverActivity > 0)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);