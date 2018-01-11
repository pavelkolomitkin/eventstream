import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete';

const VideoPreview = ({video, onDeleteButtonHandler}) => {
    return (
        <div className="video-item-preview">
            <Button fab mini className="remove-button" onClick={onDeleteButtonHandler}>
                <DeleteIcon />
            </Button>
            <img src={video.preview_image_url} className="picture" title={video.title} />
        </div>
    );
};

VideoPreview.propTypes = {
    video: PropTypes.object.isRequired,
    onDeleteButtonHandler: PropTypes.func.isRequired
};

export default VideoPreview;
