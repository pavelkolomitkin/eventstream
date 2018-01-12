import React from 'react';
import PropTypes from 'prop-types';

const EventItemPictureListItem = ({picture}) => {
    return (
        <div className="picture-list-item">
            <img src={picture.thumbs.list_preview} />
        </div>
    );
};

EventItemPictureListItem.propTypes = {
    picture: PropTypes.object.isRequired
};

export default EventItemPictureListItem;