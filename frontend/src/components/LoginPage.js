import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {
    Grid
} from 'material-ui';
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
    return (
        <Grid container className="security-page">
            <Grid item xs={0} sm={0} md={4} lg={4} xl={4} />
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <LoginForm {...props} />
            </Grid>
            <Grid item xs={0} sm={0} md={4} lg={4} xl={4} />
        </Grid>

    );
};

LoginPage.propTypes = {

};

export default LoginPage;