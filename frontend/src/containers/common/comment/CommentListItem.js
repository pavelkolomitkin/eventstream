import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconDelete from 'material-ui-icons/Delete';
import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';
import { FormLabel } from 'material-ui/Form';
import Form from '../common/form/Form';

class CommentListItem extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onEditButtonClickHandler = this.onEditButtonClickHandler.bind(this);
        this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);

        this.state = {
            editing: false,
            saving: false,
            comment: props.comment,
            errors: {}
        }
    }

    onEditButtonClickHandler = (event) => {
        this.setState({
            editing: true
        });
    }

    onChangeTextHandler = (event) => {

        const {comment} = this.state;
        comment.text = event.target.value;

        this.setState({
            comment
        });
    }

    onSubmitComment = (event) => {

        this.setState({
            saving: true
        });

        this
            .props
            .onEditHandler(this.state.comment)
            .then((comment) => {
                this.setState({
                    editing: false,
                    saving: false,
                    comment: comment
                })
            })
            .catch((errors) => {
                this.setState({
                    saving: false,
                    errors: errors
                });
            })
        ;
    }

    render = () => {

        const { editing, comment, errors } = this.state;

        return (
            <div className="comment-list-item">
                { comment.isMine &&
                    <div className="actions-container">
                        <Button onClick={this.onEditButtonClickHandler}>
                            <ModeEditIcon/>
                        </Button>
                        <Button>
                            <IconDelete/>
                        </Button>
                    </div>
                }
                <h3>{comment.author.username}</h3>
                <span>{comment.createdAt.toLocaleString()}</span>
                {
                    editing ?
                        <div className="comment-editing-form">

                            <Form>
                                <FormControl className="form-control" error aria-describedby="description-error">
                                    <TextField
                                        label="Text"
                                        margin="normal"
                                        name="text"
                                        multiline
                                        rows={3}
                                        value={comment.text}
                                        onChange={(event) => { onFieldChangeHandler('description', event.target.value) }}
                                    />

                                    {errors.text && <FormHelperText id="description-error">{errors.text}</FormHelperText>}


                                </FormControl>

                                <FormControl className="form-control submit-container">
                                    <div>
                                        <Button raised color="primary" style={{marginRight: 10}} >Save</Button>
                                    </div>
                                </FormControl>

                            </Form>
                        </div>
                        :
                        <div>{comment.text}</div>
                }
            </div>);
    }
}

CommentListItem.propTypes = {
    comment: PropTypes.object.isRequired,
    onEditHandler: PropTypes.func.isRequired
};


export default CommentListItem;