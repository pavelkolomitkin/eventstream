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
            comment: props.comment,
            errors: {},
            saving: false
        };
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            comment: nextProps.comment
        });
    }

    onSubmitHandler = (event) => {
        this.setState({
            saving: true
        });

        const {onSaveComplete} = this.props;
        this
            .props
            .onSubmitHandler(this.state.comment)
            .then((comment) => {

                this.setState({
                    comment: comment,
                    errors: {},
                    saving:false
                });

                if (onSaveComplete)
                {
                    onSaveComplete();
                }

            })
            .catch((errors) => {
                this.setState({
                    errors: errors,
                    saving: false
                });
            });
    }

    onTextChangeHandler = (event) => {

        const {comment} = this.state;
        comment.text = event.target.value;

        this.setState({
            comment: comment
        });
    }

    render = () => {

        const { comment, errors, saving } = this.state;
        const { onCancelHandler } = this.props;

        return (
            <div>
                <Form onSubmit={this.onSubmitHandler}>
                    { saving &&  <CircularProgress className="progress" /> }
                    <FormControl className="form-control" error aria-describedby="message-error">
                        <TextField
                            label="Comment text"
                            margin="normal"
                            name="text"
                            multiline
                            rows={4}
                            value={comment.text}
                            onChange={this.onTextChangeHandler}
                            disabled={saving}
                        />

                        {errors.text && <FormHelperText id="message-error">{errors.text}</FormHelperText>}


                    </FormControl>
                    <FormControl className="form-control submit-container">
                        <div>
                            <Button disabled={saving} raised color="primary" style={{marginRight: 10}} type="submit">
                                Save
                            </Button>
                            {onCancelHandler &&
                                <Button color="default" onClick={onCancelHandler}>Cancel</Button>
                            }
                        </div>
                    </FormControl>
                </Form>

            </div>);
    }
}

CommentForm.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    onCancelHandler: PropTypes.func,
    comment: PropTypes.object.isRequired,
    onSaveComplete: PropTypes.func
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