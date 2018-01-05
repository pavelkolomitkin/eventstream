import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';

class TagArrayFormControl extends Component {

    render = () => {

        const { tags, onDeleteHandler } = this.props;

        return (
            <div>
                { tags.map((tag, index) => {
                    return (<Chip key={index} label={tag.title} onDelete={onDeleteHandler(tag)} />)
                }) }



            </div>);
    }
}

TagArrayFormControl.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        /* Add new props to component from state */
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagArrayFormControl);