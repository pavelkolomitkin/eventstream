import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete';

class VideoPreview extends Component
{
    state = {
        deleting: false
    };

    onDeleteHandler = () => {
        this.setState({
            deleting: true
        });

        this.props.onDeleteButtonHandler(this.props.video);
    }

    render()
    {
        const {video, onDeleteButtonHandler} = this.props;
        const { deleting } = this.state;

        const className = 'video-item-preview' + (deleting ? ' deleting' : '');

        return (
            <div className={className}>
                <Button fab mini disabled={deleting} className="remove-button" onClick={this.onDeleteHandler}>
                    <DeleteIcon />
                </Button>
                <img src={video.preview_image_url} className="picture" title={video.title} />
            </div>
        );
    }
};

VideoPreview.propTypes = {
    video: PropTypes.object.isRequired,
    onDeleteButtonHandler: PropTypes.func.isRequired
};

export default VideoPreview;
