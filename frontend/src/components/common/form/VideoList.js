import React from 'react';
import PropTypes from 'prop-types';

import VideoPreview from './VideoPreview';

const VideoList = ({videos, onDeleteItemHandler, onVideoSelect}) => {
    return (
        <div className="video-list-container">
            {videos.map((video, index) => {
                return (
                    <VideoPreview onVideoClickHandler={onVideoSelect} key={video.id} video={video} onDeleteButtonHandler={
                        () => {
                            onDeleteItemHandler(video)
                        }
                    }/>
                );
            })}
            <div style={{clear: 'both'}}/>
        </div>
    );
};

VideoList.propTypes = {
    videos: PropTypes.array.isRequired,
    onDeleteItemHandler: PropTypes.func.isRequired,
    onVideoSelect: PropTypes.func.isRequired
};

export default VideoList;