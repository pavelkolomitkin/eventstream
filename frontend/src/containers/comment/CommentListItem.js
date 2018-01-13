import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconDelete from 'material-ui-icons/Delete';
import UserIcon from 'material-ui-icons/AccountCircle';
import CommentForm from './CommentForm';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import ModalWindow from '../../components/common/ModalWindow';


const styles = theme => ({

    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class CommentListItem extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onEditButtonClickHandler = this.onEditButtonClickHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onEditCompleteHandler = this.onEditCompleteHandler.bind(this);
        this.onConfirmHandler = this.onConfirmHandler.bind(this);

        this.state = {
            editing: false,
            deleting: false,
            isDeletingConfirmModalOpen: false
        }
    }

    onConfirmHandler = (isConfirmed) => {
        this.setState({
            isDeletingConfirmModalOpen: false
        });

        if (isConfirmed)
        {
            this.setState({
                deleting: true
            });
            this.props.onDeleteHandler(this.props.comment);
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
            isDeletingConfirmModalOpen: true
        });
    }

    onEditCompleteHandler = () => {
        this.setState({
            editing: false
        });
    }

    render = () => {

        const { editing, deleting, isDeletingConfirmModalOpen } = this.state;

        const { comment, onEditHandler, classes } = this.props;
        const clonedComment = Object.assign({}, comment);

        return (
            <div className={"comment-list-item" + (deleting ? ' deleting' : '')}>
                <ModalWindow isOpen={isDeletingConfirmModalOpen} onCloseHandler={() => {}}>
                    <Paper>
                        <div className="modal-window-content paper">
                            <Typography type="title" id="modal-title" className="title">
                                Delete this comment?
                            </Typography>

                            <div>
                                <Button onClick={() => this.onConfirmHandler(true)} raised color="accent">Yes</Button>
                                &nbsp;
                                <Button onClick={() => this.onConfirmHandler(false)} color="default">Cancel</Button>
                            </div>
                        </div>
                    </Paper>
                </ModalWindow>

                <Paper>
                    <div className="comment-content">
                        {deleting &&
                            <div className="deleting-progress"><CircularProgress /></div>
                        }

                    { comment.isMine && !deleting &&
                        <div className="actions-container">

                            <IconButton onClick={this.onEditButtonClickHandler}>
                                <ModeEditIcon/>
                            </IconButton>
                            <IconButton onClick={this.onDeleteHandler}>
                                <IconDelete/>
                            </IconButton>
                        </div>
                    }

                    <Typography type="headline" component="h4">
                        <UserIcon/>{comment.author.username}
                    </Typography>
                    <Typography className={classes.pos}>
                        { comment.createdAt.toLocaleString()}
                    </Typography>
                    {
                        editing ?
                            <CommentForm
                                comment={clonedComment}
                                onSubmitHandler={onEditHandler}
                                onCancelHandler={this.onCancelHandler}
                                onSaveComplete={this.onEditCompleteHandler}
                            />
                            :
                            <Typography component="p" className="comment-text" >
                                { comment.text }
                            </Typography>
                    }

                    </div>

                </Paper>
            </div>);
    }
}

CommentListItem.propTypes = {
    comment: PropTypes.object.isRequired,
    onEditHandler: PropTypes.func.isRequired,
    onDeleteHandler: PropTypes.func.isRequired

};


export default withStyles(styles)(CommentListItem);