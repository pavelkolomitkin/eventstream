import React from 'react';
import PropTypes from 'prop-types';

import VideoPreview from './VideoPreview';

const VideoList = ({videos}) => {
    return (
        <div className="video-list-container">
            {videos.map((video, index) => {
                return (
                    <VideoPreview key={video.video_id + '' + index} video={video}/>
                );
            })}
            <div style={{clear: 'both'}}/>
        </div>
    );
};

VideoList.propTypes = {
    videos: PropTypes.array.isRequired
};

export default VideoList;