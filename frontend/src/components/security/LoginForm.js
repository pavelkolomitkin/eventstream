import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';
import Button from 'material-ui/Button';

const LoginForm = ({error, onSubmitHandler, onFieldChangeHandler, classes}) => (
    <form onSubmit={onSubmitHandler}>
        <h2>Login</h2>

        <FormControl className="form-control" error aria-describedby="email-error">
            <TextField
                label="Email or Username"
                margin="normal"
                name="username"
                onChange={onFieldChangeHandler}
            />
        </FormControl>
        <FormControl className="form-control" error aria-describedby="password-error">
            <TextField
                label="Password"
                margin="normal"
                type="password"
                name="password"
                onChange={onFieldChangeHandler}
            />
        </FormControl>
        {
            error !== ''
            ?
                <FormControl error aria-describedby="common-error">
                    <FormHelperText id="common-error">{ error }</FormHelperText>
                </FormControl>
                : null
        }

        <br />
        <FormControl className="form-control submit-container">
            <div>
                <Button raised color="primary" style={{marginRight: 10 }}  type="submit">Submit</Button>
                <Button color="default" component={Link} to="/register">Register</Button>
            </div>
        </FormControl>
    </form>
);

LoginForm.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    onFieldChangeHandler: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default LoginForm;