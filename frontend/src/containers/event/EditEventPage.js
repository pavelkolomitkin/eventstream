import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/eventActions';
import EventForm from '../../components/event/EventForm';
import CommonLayout from '../../components/layout/CommonPage';

class EditEventPage extends Component {

    state = {
        edited: false,
    }

    constructor(props, context)
    {
        super(props, context);

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onFieldChangeHandler = this.onFieldChangeHandler.bind(this);
    }

    onFieldChangeHandler = (name, value) => {

        const event = this.state.event;
        event[name] = value;

        this.setState({
            event: event
        });
    }

    onSubmitHandler = (domEvent) => {
        domEvent.preventDefault();

        const { event } = this.props;

        this.props.actions.updateEvent({
            ...event,
            tags: this.state.rawTags,
            pictures: event.pictures.map(picture => picture.id),
            videos: event.videos.map(video => video.id)
        });

        this.setState({
            edited: true
        })
    };

    componentWillReceiveProps(nextProps)
    {
        const {errors} = nextProps;

        if (this.state.edited && (errors === null))
        {
            this.props.history.push('/event/' + nextProps.event.id);
            return;
        }

        if (nextProps.loadEventError)
        {
            this.props.history.replace('/notfound');
            return;
        }

        this.setState({
            event: nextProps.event,
            rawTags: nextProps.event.tags.map((tag) => tag.title)
        });
    }

    componentDidUpdate()
    {

    }

    componentDidMount()
    {
        this.props.actions.getOwnEvent(this.props.id);
    }

    render = () => {

        const { event } = this.state;
        const { rawTags } = this.state;

        if (!event)
        {
            return null;
        }

        const errors = this.props.errors ? this.props.errors : {};

        return (
            <div>
                <CommonLayout>
                    <EventForm
                        errors={ errors }
                        title={event.title}
                        description={event.description}
                        timeStart={event.timeStart}
                        timeEnd={event.timeEnd}
                        tags={rawTags}
                        onFieldChangeHandler={this.onFieldChangeHandler}
                        onSubmitHandler={this.onSubmitHandler}
                        images={event.pictures}
                        maxUploadedImageSize={5242880} // TODO вынести в конфиг
                        videos={event.videos}
                    />
                </CommonLayout>
            </div>);
    }
}

EditEventPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {

    return {
        id: parseInt(ownProps.match.params.id),
        errors: state.event.updateEventErrors,
        event: state.event.ownEvent,
        loadEventError: state.event.ownEventError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(eventActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);