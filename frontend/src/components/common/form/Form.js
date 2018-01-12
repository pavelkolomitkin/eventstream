import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
    return (
        <form onSubmit={(event) => {if (event.which == 13) {event.preventDefault()}}} {...props}>
            { props.children }
        </form>
    );
};

Form.propTypes = {};

export default Form;