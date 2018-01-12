import React from 'react';
import PropTypes from 'prop-types';
import EventItemVideoListItem from './EventItemVideoListItem';

const EventItemVideoList = ({ videos }) => {
    return (
        <div className="event-item-video-list">
            {
                videos.map((video) => {
                    return (
                        <EventItemVideoListItem key={video.id} video={video} />
                    )
                })
            }
            <div className="clearfix" />
        </div>
    );
};

EventItemVideoList.propTypes = {
    videos: PropTypes.array.isRequired
};

export default EventItemVideoList;