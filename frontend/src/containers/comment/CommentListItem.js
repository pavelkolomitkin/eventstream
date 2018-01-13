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
import Form from '../../components/common/form/Form';
import CommentForm from './CommentForm';

class CommentListItem extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onEditButtonClickHandler = this.onEditButtonClickHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onEditCompleteHandler = this.onEditCompleteHandler.bind(this);

        this.state = {
            editing: false,
            deleting: false
        }
    }

    onEditButtonClickHandler = (event) => {
        this.setState({
            editing: true
        });
    }

    onCancelHandler = () => {
        this.setState({
            editing: false
        });
    }

    onDeleteHandler = () => {
        this.setState({
            deleting: true
        });
        this.props.onDeleteHandler(this.props.comment);
    }

    onEditCompleteHandler = () => {
        this.setState({
            editing: false
        });
    }

    render = () => {

        const { editing, deleting } = this.state;

        const { comment, onEditHandler } = this.props;
        const clonedComment = Object.assign({}, comment);

        return (
            <div className="comment-list-item">
                { comment.isMine && !deleting &&
                    <div className="actions-container">
                        <Button onClick={this.onEditButtonClickHandler}>
                            <ModeEditIcon/>
                        </Button>
                        <Button onClick={this.onDeleteHandler}>
                            <IconDelete/>
                        </Button>
                    </div>
                }
                <h3>{comment.author.username}</h3>
                <span>{comment.createdAt.toLocaleString()}</span>
                {
                    editing ?
                        <CommentForm
                            comment={clonedComment}
                            onSubmitHandler={onEditHandler}
                            onCancelHandler={this.onCancelHandler}
                            onSaveComplete={this.onEditCompleteHandler}
                        />
                        :
                        <div>{comment.text}</div>
                }
            </div>);
    }
}

CommentListItem.propTypes = {
    comment: PropTypes.object.isRequired,
    onEditHandler: PropTypes.func.isRequired,
    onDeleteHandler: PropTypes.func.isRequired

};


export default CommentListItem;