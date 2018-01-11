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
        tags: []
    }

    constructor(props, context)
    {
        super(props, context);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onNewPictureUploaded = this.onNewPictureUploaded.bind(this);
    }

    onFieldChangeHandler = (name, value) => {

        const newState = {};
        newState[name] = value;

        this.setState(newState);
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.state.pictures = this.props.unlinkedPictures;

        this.props.actions.create(
            this.state.title,
            this.state.description,
            this.state.timeStart,
            this.state.timeEnd,
            this.state.tags,
            this.state.pictures.map((picture) => {
                return picture.id;
            })
        );
    };

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.eventData)
        {
            this.props.history.push('/event/' + nextProps.eventData.event.id);
            return false;
        }

        return true;
    }

    componentDidMount()
    {
        this.props.pictureActions.loadAllUnlinkedPictures();
    }

    onFormKeyPressHandler = (event) => {
        //TODO вынести функционал в общую форму - компонент
        if (event.which == 13)
        {
            event.preventDefault();
        }
    };

    onNewPictureUploaded(picture)
    {
        this.props.pictureActions.loadAllUnlinkedPictures();
        this.state.videoActions.loadAllUnlinkedVideos();
    }


    render = () => {
        return (
            <CommonLayout>
                <EventForm
                    errors={this.props.errors}
                    title={this.state.title}
                    description={this.state.description}
                    timeStart={this.state.timeStart}
                    timeEnd={this.state.timeEnd}
                    tags={this.state.tags}
                    onFieldChangeHandler={this.onFieldChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    onFormKeyPressHandler={this.onFormKeyPressHandler}
                    images={this.props.unlinkedPictures}
                    maxUploadedImageSize={5242880}
                    onPictureUploaded={this.onNewPictureUploaded}
                    videos={this.props.unlinkedVideos}
                />
            </CommonLayout>
            );
    }
}

CreateEventPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.event.eventErrors ? state.event.eventErrors : {},
        eventData: state.event.eventData,
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