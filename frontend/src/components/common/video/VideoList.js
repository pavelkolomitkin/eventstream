import React from 'react';
import PropTypes from 'prop-types';

import VideoPreview from './VideoPreview';

const VideoList = ({videos}) => {
    return (
        <div>
            {videos.map((video, index) => {
                return (
                    <VideoPreview key={index} video={video}/>
                );
            })}
        </div>
    );
};

VideoList.propTypes = {
    videos: PropTypes.array.isRequired
};

export default VideoList;