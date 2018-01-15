import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../actions/eventActions';
import * as eventPicturesActions from '../../actions/eventPictureActions';
import * as videoActions from '../../actions/videoActions';

import EventForm from '../../components/event/EventForm';
import CommonLayout from '../../components/layout/CommonPage';

class CreateEventPage extends Component {

    state = {
        title: '',
        description: '',
        timeStart: new Date(),
        timeEnd: new Date(),
        tags: [],
        submitted: false,
        errors: {},
        unlinkedPictures: [],
        unlinkedVideos: []

    }

    constructor(props, context)
    {
        super(props, context);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onFieldChangeHandler = (name, value) => {

        const newState = {};
        newState[name] = value;

        this.setState(newState);
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.state.pictures = this.props.unlinkedPictures;
        this.state.videos = this.props.unlinkedVideos;

        const pictureIds = this.state.pictures.map((picture) => {
            return picture.id;
        });

        const videoIds = this.state.videos.map((video) => {
            return video.id;
        });

        this.props.actions.create(
            this.state.title,
            this.state.description,
            this.state.timeStart,
            this.state.timeEnd,
            this.state.tags,
            pictureIds,
            videoIds
        );

        this.setState({
            submitted: true
        });
    };

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.event && this.state.submitted)
        {
            this.props.history.push('/event/' + nextProps.event.id);
            return;
        }

        const newState = {
            unlinkedPictures: nextProps.unlinkedPictures,
            unlinkedVideos: nextProps.unlinkedVideos

        };

        if (nextProps.errors)
        {
            newState.errors = nextProps.errors;

        }

        this.setState(newState);
    }

    componentDidMount()
    {
        this.props.pictureActions.loadAllUnlinkedPictures();
        this.props.videoActions.loadAllUnlinkedVideos();
    }

    render = () => {
        return (
            <CommonLayout>
                <EventForm
                    errors={this.state.errors}
                    title={this.state.title}
                    description={this.state.description}
                    timeStart={this.state.timeStart}
                    timeEnd={this.state.timeEnd}
                    tags={this.state.tags}
                    onFieldChangeHandler={this.onFieldChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    images={this.state.unlinkedPictures}
                    maxUploadedImageSize={5242880}
                    videos={this.state.unlinkedVideos}
                />
            </CommonLayout>
            );
    }
}

CreateEventPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.event.createEventError,
        event: state.event.createdEvent,
        unlinkedPictures: state.eventPicture.unlinkedPictures ? state.eventPicture.unlinkedPictures : [],
        unlinkedVideos: state.video.unlinkedVideos ? state.video.unlinkedVideos : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(eventActions, dispatch),
        pictureActions: bindActionCreators(eventPicturesActions, dispatch),
        videoActions: bindActionCreators(videoActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);