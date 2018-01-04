import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';
import Button from 'material-ui/Button';

const RegisterForm = ({errors, onSubmitHandler, onFieldChangeHandler}) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <h2>Register</h2>

            <FormControl className="form-control" error aria-describedby="username-error">
                <TextField
                    label="Username"
                    margin="normal"
                    name="username"
                    onChange={onFieldChangeHandler}
                />
                {
                    errors.username && <FormHelperText id="username-error">{ errors.username }</FormHelperText>
                }

            </FormControl>
            <FormControl className="form-control" error aria-describedby="email-error">
                <TextField
                    label="Email"
                    margin="normal"
                    name="email"
                    onChange={onFieldChangeHandler}
                />
                {
                    errors.email && <FormHelperText id="email-error">{ errors.email }</FormHelperText>
                }
            </FormControl>
            <FormControl className="form-control" error aria-describedby="password-error">
                <TextField
                    label="Password"
                    margin="normal"
                    type="password"
                    name="password"
                    onChange={onFieldChangeHandler}
                />
                {
                    errors.password && <FormHelperText id="password-error">{ errors.password }</FormHelperText>
                }
            </FormControl>
            <FormControl className="form-control" error aria-describedby="password-repeat-error">
                <TextField
                    label="Repeat password"
                    margin="normal"
                    type="password"
                    name="passwordRepeat"
                    onChange={onFieldChangeHandler}
                />
                {
                    errors.passwordRepeat && <FormHelperText id="password-repeat-error">{ errors.passwordRepeat }</FormHelperText>
                }
            </FormControl>
            <br />
            <FormControl className="form-control submit-container">
                <div>
                    <Button raised color="primary" style={{marginRight: 10}} type="submit">Submit</Button>
                    <Button component={Link} to="/login">Login</Button>
                </div>
            </FormControl>
        </form>
    );
};

RegisterForm.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    onFieldChangeHandler: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default RegisterForm;