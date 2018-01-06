import React from 'react';
import PropTypes from 'prop-types';

import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';

import { FormLabel } from 'material-ui/Form';
import { DateTimePicker } from 'material-ui-pickers';
import Button from 'material-ui/Button';

import TagArrayFormControl from '../../containers/common/form/TagArrayFormControl';

const EventForm = ({errors, title, description, timeStart, timeEnd, tags, onFieldChangeHandler, onSubmitHandler, onFormKeyPressHandler}) => {
    return (
        <div>
            <form onSubmit={onSubmitHandler} onKeyPress={onFormKeyPressHandler}>
                <h2>Create new event</h2>

                <FormControl className="form-control" error aria-describedby="title-error">
                    <TextField
                        label="Title"
                        margin="normal"
                        name="title"
                        value={title}
                        onChange={(event) => { onFieldChangeHandler('title', event.target.value) }}
                    />

                    {errors.title &&  <FormHelperText id="title-error">{errors.title}</FormHelperText> }

                </FormControl>

                <FormControl className="form-control" error aria-describedby="description-error">
                    <TextField
                        label="Description"
                        margin="normal"
                        name="description"
                        multiline
                        rows={10}
                        value={description}
                        onChange={(event) => { onFieldChangeHandler('description', event.target.value) }}
                    />

                    {errors.description && <FormHelperText id="description-error">{errors.description}</FormHelperText>}


                </FormControl>

                <FormControl className="form-control date-time-field" error aria-describedby="time-start-error">
                    <FormLabel component="legend">Time Start</FormLabel>
                    <DateTimePicker
                        onChange={(time) => {onFieldChangeHandler('timeStart', time)}}
                        value={timeStart}
                    />

                    {errors.timeStart && <FormHelperText id="time-start-error">{errors.timeStart}</FormHelperText>}


                </FormControl>

                <FormControl className="form-control date-time-field" error aria-describedby="time-end-error">
                    <FormLabel component="legend">Time End</FormLabel>
                    <DateTimePicker
                        onChange={(time) => {onFieldChangeHandler('timeEnd', time)}}
                        value={timeEnd}
                    />
                    {errors.timeEnd && <FormHelperText id="time-end-error">{errors.timeEnd}</FormHelperText>}
                </FormControl>

                <FormControl className="form-control">
                    <FormLabel component="legend">Tags</FormLabel>
                    <TagArrayFormControl tags={tags} />

                </FormControl>


                <FormControl className="form-control submit-container">
                    <div>
                        <Button raised color="primary" style={{marginRight: 10}} type="submit">Submit</Button>
                    </div>
                </FormControl>
            </form>
        </div>
    );
};

EventForm.propTypes = {
    errors: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timeStart: PropTypes.object.isRequired,
    timeEnd: PropTypes.object.isRequired,
    onFieldChangeHandler: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired
};

export default EventForm;