import React from 'react';
import PropTypes from 'prop-types';

const VideoPreview = ({video}) => {
    return (
        <div className="video-item-preview">

        </div>
    );
};

VideoPreview.propTypes = {
    video: PropTypes.object.isRequired
};

export default VideoPreview;