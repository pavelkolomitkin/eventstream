import React from 'react';
import PropTypes from 'prop-types';

const VideoPreview = ({video}) => {
    return (
        <div className="video-item-preview">
            <img src={video.preview_image_url} className="picture" title={video.title} />
        </div>
    );
};

VideoPreview.propTypes = {
    video: PropTypes.object.isRequired
};

export default VideoPreview;
