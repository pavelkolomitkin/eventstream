import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import EventItemPictureList from '../picture/EventItemPictureList';
import EventItemVideoList from '../video/EventItemVideoList';
import EventItemTagList from '../tag/EventItemTagList';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});


const EventListItem = ({event, classes}) => {
    return (
        <div className="profile-event-item">
            <div className="event-actions-container">
                <Button>
                    <ModeEditIcon /> Edit
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Link to={'/event/' + event.id}><h2 className="header">{ event.title }</h2></Link>
                    <Typography className={classes.pos}>{ event.timeStart.toLocaleString() } - {event.timeEnd.toLocaleString()}</Typography>
                    <Typography component="p" className="description">
                        { event.description }
                    </Typography>
                    { event.pictures.length > 0 && <EventItemPictureList pictures={event.pictures} /> }
                    { event.videos.length > 0 && <EventItemVideoList videos={event.videos} />}
                    { event.tags.length > 0 && <EventItemTagList tags={event.tags} />}
                </CardContent>
            </Card>

        </div>
    );
};

EventListItem.propTypes = {
    event: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventListItem);