import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';

class CommentList extends Component {

    render = ({comments, onCommentEditHandler}) => {
        return (
            <div>
                {comments.map((comment) => {
                    return <CommentListItem comment={comment} onEditHandler={onCommentEditHandler}/>
                })}

            </div>);
    }
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    onCommentEditHandler: PropTypes.func.isRequired
};

export default CommentList;