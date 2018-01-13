import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Form from '../../components/common/form/Form';
import { CircularProgress } from 'material-ui/Progress';

import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';

import { FormLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';

class CommentForm extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            text: '',
            errors: {},
            saving: false
        };
    }

    onSubmitHandler = (event) => {
        this.setState({
            saving: true
        });
        this.props.onSubmitHandler({
                text: this.state.text
            })
            .then((comment) => {

                this.setState({
                    text: '',
                    errors: {},
                    saving:false
                });

            })
            .catch((errors) => {
                this.setState({
                    errors: errors,
                    saving: false
                });
            });
    }

    onTextChangeHandler = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    render = () => {

        const { text, errors, saving } = this.state;

        return (
            <div>
                <Form onSubmit={this.onSubmitHandler}>
                    { saving &&  <CircularProgress className="progress" /> }
                    <FormControl className="form-control" error aria-describedby="message-error">
                        <TextField
                            label="Add comment"
                            margin="normal"
                            name="text"
                            multiline
                            rows={4}
                            value={text}
                            onChange={this.onTextChangeHandler}
                            disabled={saving}
                        />

                        {errors.text && <FormHelperText id="message-error">{errors.text}</FormHelperText>}


                    </FormControl>
                    <FormControl className="form-control submit-container">
                        <div>
                            <Button disabled={saving} raised color="primary" style={{marginRight: 10}} type="submit">Add</Button>
                        </div>
                    </FormControl>
                </Form>

            </div>);
    }
}

CommentForm.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired
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

export default CommentForm;