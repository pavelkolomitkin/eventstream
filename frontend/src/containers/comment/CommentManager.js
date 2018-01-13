import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import ApiServiceFactory from '../../services/ApiServiceFactory';
import { CircularProgress } from 'material-ui/Progress';
import InfiniteScroll from 'react-infinite-scroller';
import CommentListItem from './CommentListItem';

class CommentManager extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onSubmitNewCommentHandler = this.onSubmitNewCommentHandler.bind(this);
        this.onCommentEditHandler = this.onCommentEditHandler.bind(this);
        this.requestMoreComments = this.requestMoreComments.bind(this);

        this.apiService = ApiServiceFactory.createCommentService();

        this.state = {
            comments: [],
            commentListPageNumber: 1,
            noMoreComments: false,
            newComment: {
                text: ''
            }
        };
    }

    onSubmitNewCommentHandler = (comment) => {

        const self = this;
        const {event} = this.props;

        return new Promise((resolve, reject) => {

            self.apiService.create(
                    comment.text,
                    event.id,
                    (comment) => {

                        const emptyComment = {
                            text: ''
                        };

                        resolve(emptyComment);

                        self.state.comments.unshift(comment);
                        self.setState({
                            comments: self.state.comments,
                            newComment: emptyComment
                        });
                    },
                    (errors) => {
                        reject(errors);
                    }
                );

        });
    }

    onCommentEditHandler = (comment) => {

        const self = this;

        return new Promise((resolve, reject) => {
            self.apiService.update(
                comment,
                (comment) => {
                    resolve(comment);

                    const comments = self.state.comments;

                    const editedCommentIndex = comments.findIndex((currentComment) => {
                        return (comment.id === currentComment.id);
                    });

                    if (editedCommentIndex !== -1)
                    {
                        comments[editedCommentIndex] = comment;
                    }

                    this.setState({
                        comments: comments
                    });
                },
                (errors) => {
                    reject(errors);
                }
                );

        });
    }


    requestMoreComments()
    {
        const {noMoreComments} = this.state;

        if (noMoreComments)
        {
            return;
        }

        const {comments, commentListPageNumber} = this.state;
        const { event } = this.props;

        this.apiService.getEventComments(
            event.id,
            commentListPageNumber,
            (newComments, total, page) => {

                this.setState({
                    comments: comments.concat(newComments),
                    commentListPageNumber: page + 1,
                    noMoreComments: (newComments.length === 0)
                });
            },
            (error) => {
                console.log(error);
                this.setState({
                    noMoreComments: true,
                });
            });
    }

    render = () => {

        const { comments, noMoreComments, newComment} = this.state;

        return (
            <div className="comment-manager">

                <CommentForm comment={newComment} onSubmitHandler={this.onSubmitNewCommentHandler} />


                <InfiniteScroll
                    pageStart={1}
                    loadMore={this.requestMoreComments}
                    hasMore={!noMoreComments}
                    loader={<div className="comment-load-progress">
                                <CircularProgress className="progress"/>
                            </div>
                    }
                    useWindow={true}
                >
                    {comments.map((comment) => {
                        return <CommentListItem key={comment.id} comment={comment} onEditHandler={this.onCommentEditHandler}/>
                    })}
                </InfiniteScroll>

            </div>);
    }
}

CommentManager.propTypes = {
    event: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentManager);