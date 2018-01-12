import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import EventForm from '../../components/event/EventForm';
import CommonLayout from '../../components/layout/CommonPage';

class EditEventPage extends Component {

    state = {
        event: null
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

        this.props.actions.update(this.state.event);
    };

    componentDidUpdate()
    {

    }

    componentDidMount()
    {
        this.props.actions.getOwnEvent();
    }

    render = () => {

        const { event } = this.state;

        if (event === null)
        {
            return null;
        }

        return (
            <div>
                <CommonLayout>
                    <EventForm
                        errors={this.props.errors}
                        title={event.title}
                        description={event.description}
                        timeStart={event.timeStart}
                        timeEnd={event.timeEnd}
                        tags={event.tags}
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
        errors: state.event.updateEventErrors ? state.event.updateEventErrors : {},
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