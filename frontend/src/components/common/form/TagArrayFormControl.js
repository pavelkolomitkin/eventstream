import React, { Component } from 'react';
import PropTypes from 'prop-types';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        zIndex: 5000
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

    renderInput = (inputProps) => {
        const { classes, autoFocus, value, ref, onKeyPress, ...other } = inputProps;

        return (
            <TextField
                autoFocus={autoFocus}
                className={classes.textField}
                value={value}
                inputRef={ref}
                onKeyPress={onKeyPress}
                InputProps={{
                    classes: {
                        input: classes.input,
                    },
                    ...other,
                }}
            />
        );
    };

    renderSuggestionsContainer = (options) => {
        const { containerProps, children } = options;

        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    };

    getSuggestionValue = (tag) => {
        return tag;
    };

    renderSuggestion = (tag, { query, isHighlighted }) => {
        const matches = match(tag, query);
        const parts = parse(tag, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </strong>
                        );
                    })}
                </div>
            </MenuItem>
        );
    };

    render = () => {

        const {
            tags,
            foundTags,
            classes,
            inputValue,
            onInputChange,
            onDeleteTagHandler,
            onInputKeyPressHandler,
            onTagFetchRequest,
            onTagClearRequest,
            onTagSelectHandler
        } = this.props;

        return (
            <div>
                <div className={classes.row}>
                    { tags.map((tag, index) => {
                        return (<Chip className={classes.chip} key={index} label={tag} onDelete={onDeleteTagHandler(tag)} />)
                    }) }
                </div>
                <Autosuggest
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderInputComponent={this.renderInput}
                    suggestions={foundTags}
                    onSuggestionsFetchRequested={onTagFetchRequest}
                    onSuggestionsClearRequested={onTagClearRequest}
                    renderSuggestionsContainer={this.renderSuggestionsContainer}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionSelected={onTagSelectHandler}
                    inputProps={{
                        autoFocus: true,
                        classes,
                        placeholder: 'Add tags...',
                        value: inputValue,
                        onChange: onInputChange,
                        onKeyPress: onInputKeyPressHandler
                    }}
                />

            </div>);
    }
};

TagArrayFormControl.propTypes = {
    tags: PropTypes.array.isRequired,
    foundTags: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    inputValue: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onDeleteTagHandler: PropTypes.func.isRequired,
    onInputKeyPressHandler: PropTypes.func.isRequired,
    onTagFetchRequest: PropTypes.func.isRequired,
    onTagClearRequest: PropTypes.func.isRequired,
    onTagSelectHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(TagArrayFormControl);