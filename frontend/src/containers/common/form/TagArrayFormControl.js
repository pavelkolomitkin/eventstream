import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import EventTagService from '../../../services/api/EventTagService';
import SessionManager from '../../../services/SessionManager';

import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

import TagArrayFormControlComponent from '../../../components/common/form/TagArrayFormControl';

class TagArrayFormControl extends Component {

    state = {
        foundTags: [],
        value: ''
    };

    constructor(props, context)
    {
        super(props, context);

        this.apiTagService = new EventTagService(SessionManager.getAuthToken());
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
    }

    appendTag(tag)
    {
        tag = tag.trim();
        if (tag === '')
        {
            return;
        }

        if (this.props.tags.indexOf(tag) === -1)
        {
            this.props.tags.push(tag);
            this.setState({
                value: ''
            });
        }
    }

    onKeyPressHandler = (event) => {

        if (event.which !== 13)
        {
            return;
        }

        this.appendTag(event.target.value);
    };


    handleSuggestionsFetchRequested = ({value}) => {
        this.apiTagService.search(
            value,
            ({tags}) => {
                this.setState({
                    foundTags: tags.map((tag) => tag.title)
                });
            },
            (error) => {
                console.log(error);
            });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            foundTags: []
        });
    };


    onTextInputChangeHandler = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {

        this.appendTag(suggestion);
    };

    onDeleteTagHandler = (tag) => () => {
        const index = this.props.tags.indexOf(tag);
        if (index !== -1)
        {
            this.props.tags.splice(index, 1);
        }

        this.setState({});
    };

    render = () => {

        const { tags } = this.props;

        return (
            <TagArrayFormControlComponent
                tags={tags}
                foundTags={this.state.foundTags}
                onDeleteTagHandler={this.onDeleteTagHandler}
                inputValue={this.state.value}
                onInputChange={this.onTextInputChangeHandler}
                onInputKeyPressHandler={this.onKeyPressHandler}
                onTagClearRequest={this.handleSuggestionsClearRequested}
                onTagFetchRequest={this.handleSuggestionsFetchRequested}
                onTagSelectHandler={this.onSuggestionSelected}
            />
        )
    }
}

TagArrayFormControl.propTypes = {
    tags: PropTypes.array.isRequired
};


export default TagArrayFormControl;