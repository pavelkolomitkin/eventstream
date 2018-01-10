import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import UploadImagePreview from './UploadImagePreview';

class UploadedImageList extends Component {

    render = () => {

        const { images, emptyMessage } = this.props;

        return (
            <div className="upload-images-list">
                {
                    images.length > 0
                    ?
                        images.map((picture, index) => {
                            return (
                                <UploadImagePreview key={picture.id} image={picture} />
                            );
                        })
                        :
                        <span>{ emptyMessage }</span>
                }
            </div>
        );
    }
}

UploadedImageList.propTypes = {
    images: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadedImageList);