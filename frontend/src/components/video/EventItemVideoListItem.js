import React from 'react';
import PropTypes from 'prop-types';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

const EventItemVideoListItem = ({video}) => {
    return (
        <div className="video-list-item">
            <img src={video.preview_image_url} className="preview" />
            <div className="icon-container">
                <PlayArrowIcon color="contrast" className="play-icon"/>
            </div>
        </div>
    );
};

EventItemVideoListItem.propTypes = {
    video: PropTypes.object.isRequired
};

export default EventItemVideoListItem;