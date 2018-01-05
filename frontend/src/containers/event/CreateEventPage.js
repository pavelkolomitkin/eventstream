import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../actions/eventActions';

import EventForm from '../../components/event/EventForm';
import CommonLayout from '../../components/layout/CommonPage';

class CreateEventPage extends Component {

    state = {
        title: '',
        description: '',
        timeStart: new Date(),
        timeEnd: new Date()
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
        //debugger;

        this.props.actions.create(
            this.state.title,
            this.state.description,
            this.state.timeStart,
            this.state.timeEnd,
        );
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.eventData)
        {
            this.props.history.push('/event/' + nextProps.eventData.event.id);
            return false;
        }

        return true;
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
                    onFieldChangeHandler={this.onFieldChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </CommonLayout>
            );
    }
}

CreateEventPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.event.eventErrors ? state.event.eventErrors : {},
        eventData: state.event.eventData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);