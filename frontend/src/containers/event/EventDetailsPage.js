import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/eventActions';
import CommonLayout from '../../components/layout/CommonPage';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import EventTagList from  '../../components/tag/EventItemTagList';
import CommentManager from '../comment/CommentManager';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({

    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class EventDetailsPage extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            event: null,
            needLoadComments: false,
            saving: false
        };

        this.onRemoveMemberHandler = this.onRemoveMemberHandler.bind(this);
        this.onAddMemberHandler = this.onAddMemberHandler.bind(this);
        this.onAddLikeHandler = this.onAddLikeHandler.bind(this);
        this.onRemoveLikeHandler = this.onRemoveLikeHandler.bind(this);
    }

    onAddMemberHandler = (domEvent) => {
        this.setState({
            saving: true
        });
        this.props.actions.addMeMemberToEvent(this.state.event.id);
    }

    onRemoveMemberHandler = (domEvent) => {
        this.setState({
            saving: true
        });
        this.props.actions.removeMeMemberFromEvent(this.state.event.id);
    }

    onAddLikeHandler = (domEvent) => {
        this.setState({
            saving: true
        });
        this.props.actions.addUserLikeToEvent(this.state.event.id);
    }

    onRemoveLikeHandler = (domEvent) => {
        this.setState({
            saving: true
        });
        this.props.actions.removeLikeFromEvent(this.state.event.id);
    }

    componentDidMount()
    {
        this.props.actions.getEvent(this.props.id);
    }

    componentDidUpdate()
    {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.error)
        {
            this.props.history.replace('/notfound');
            return;
        }

        this.setState({
            event: nextProps.event,
            saving: false
        });
    }

    getControls()
    {
        const { isMine } = this.state.event;

        if (isMine)
        {
            return this.getOwnerControls();
        }
        else
        {
            return this.getUserRelationControls();
        }
    }

    getOwnerControls()
    {
        const {event} = this.state;

        return (<Button component={Link} to={'/event/' + event.id + '/edit'}>
            <ModeEditIcon/> Edit
        </Button>);

    }


    getUserRelationControls()
    {
        const result = [];

        const { isMember, isLiker } = this.state.event;
        const { saving } = this.state;

        if (isMember)
        {
            result.push(<Button disabled={saving} raised color="primary" onClick={this.onRemoveMemberHandler}>Leave</Button>);
        }
        else
        {
            result.push(<Button disabled={saving} raised color="primary" onClick={this.onAddMemberHandler}>Join</Button>);
        }


        if (isLiker)
        {
            result.push(<Button disabled={saving} onClick={this.onRemoveLikeHandler} raised color="primary">Dislike</Button>);
        }
        else
        {
            result.push(<Button disabled={saving} onClick={this.onAddLikeHandler} raised color="primary">Like</Button>);
        }

        return result;
    }

    render = () => {

        const {classes} = this.props;
        const { event } = this.state;

        if (!event)
        {
            return null;
        }


        return (
                <CommonLayout>
                    <div className="event-details-page">
                        <Paper className="event-details-content">

                                <div className="event-actions-container">
                                    {this.getControls()}
                                    <div className="numbers">
                                        <Typography className={classes.pos + ' number'}>{event.memberNumber} member(s)</Typography>
                                        <Typography className={classes.pos + ' number'}>{event.likeNumber} likes(s)</Typography>
                                    </div>
                                </div>

                            <Typography type="headline" component="h1">
                                {event.title}
                            </Typography>
                            <Typography className={classes.pos}>
                                { event.timeStart.toLocaleString() } - {event.timeEnd.toLocaleString()}
                            </Typography>
                            <Typography component="p" className="description" >
                                { event.description }
                            </Typography>
                            { event.pictures.length > 0 &&
                                <div className="picture-list">
                                    {
                                        event.pictures.map((picture) => {
                                            return (<div key={picture.id} className="picture-item-container">
                                                <img src={picture.thumbs.normal} className="picture" />
                                            </div>)
                                        })
                                    }
                                </div>
                                }
                            {event.videos.length > 0 &&
                                <div className="video-list">
                                    {
                                        event.videos.map((video) => {
                                            return (
                                                <div key={video.id} className="video-item-container">
                                                    <div
                                                        className="video-content"
                                                        dangerouslySetInnerHTML={{__html: video.html_frame}}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {event.tags.length > 0 &&
                                <EventTagList tags={event.tags}/>
                            }
                        </Paper>


                        <CommentManager event={event} />
                    </div>

                </CommonLayout>
            );
    }
}

EventDetailsPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        event: state.event.event,
        error: state.event.eventGetError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventDetailsPage));