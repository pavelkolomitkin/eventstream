import React from 'react';
import PropTypes from 'prop-types';
import EventItemPictureListItem from './EventItemPictureListItem';

const EventItemPictureList = ({pictures}) => {
    return (
        <div className="picture-list">
            {
                pictures.map((picture) => {
                    return (
                        <EventItemPictureListItem key={picture.id} picture={picture} />
                    );
                })
            }

            <div className="clearfix" />
        </div>
    );
};

EventItemPictureList.propTypes = {
    pictures: PropTypes.array.isRequired
};

export default EventItemPictureList;