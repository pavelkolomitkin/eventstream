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

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: 200,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        width: '100%',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});


class TagArrayFormControl extends Component {

    state = {
        foundTags: [],
        value: ''
    };

    constructor(props, context)
    {
        super(props, context);

        this.apiTagService = new EventTagService(SessionManager.getAuthToken());
    }

    onKeyPressHandler = (event) => {

        if (event.which !== 13)
        {
            return;
        }

        const tag = event.target.value.trim();
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

        suggestion = suggestion.trim();
        if (suggestion === '')
        {
            return;
        }

        if (this.props.tags.indexOf(suggestion) === -1)
        {
            this.props.tags.push(suggestion);
        }


        this.setState({
            value: ''
        });
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


export default withStyles(styles)(TagArrayFormControl);