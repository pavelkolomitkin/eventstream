import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';
import Button from 'material-ui/Button';

const LoginForm = (props) => (
    <form>
        <h2>Login</h2>
        <FormControl className="form-control" error aria-describedby="email-error">
            <TextField
                label="Email or Username"
                margin="normal"
            />
            <FormHelperText id="email-error">Error</FormHelperText>
        </FormControl>
        <FormControl className="form-control" error aria-describedby="password-error">
            <TextField
                label="Password"
                margin="normal"
                type="password"
            />
            <FormHelperText id="password-error">Error</FormHelperText>
        </FormControl>
        <br />
        <FormControl className="form-control submit-container">
            <Button raised color="primary" style={{marginTop: 10}}>Submit</Button>
        </FormControl>
    </form>
);

LoginForm.propTypes = {};

export default LoginForm;