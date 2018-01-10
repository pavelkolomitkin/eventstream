import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class PictureList extends Component {

    render = () => {

        const { pictures, emptyMessage } = this.props;

        return (
            <div>
                { pictures.length > 0
                    ?
                    pictures.map((picture, index) => {
                        return ;
                    });

                }

            </div>);
    }
}

PictureList.propTypes = {
    pictures: PropTypes.array.isRequired,
    emptyMessage: PropTypes.array
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);