import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
    let onSubmitHandler = null;
    let newProps = { ...props };
    if (newProps.onSubmit) {
        onSubmitHandler = newProps.onSubmit;
        delete newProps['onSubmit'];
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (onSubmitHandler)
            {
                onSubmitHandler(event);
            }
            }}
              onKeyPress={(event) => {if (event.which == 13) {event.preventDefault()}}} {...newProps}>
            { props.children }
        </form>
    );
};

Form.propTypes = {};

export default Form;