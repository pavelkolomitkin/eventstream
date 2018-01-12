import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const EventItemTagList = ({ tags }) => {
    return (
        <div className="tag-list">
            {
                tags.map((tag) => {
                    return (<Chip key={tag.id} label={tag.title} className="tag-item" />)
                })
            }
        </div>
    );
};

EventItemTagList.propTypes = {
    tags: PropTypes.array.isRequired
};

export default EventItemTagList;