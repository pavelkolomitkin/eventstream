import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import UploadImageAdapter from './UploadedImageAdapter';


class UploadImagePreview extends Component {

    state = {
        isComplete: false,
        progressPercentValue: 0,
        isError: false,
    };

    constructor(props, context)
    {
        super(props, context);
    }

    componentDidMount()
    {
        const {image} = this.props.image;

        if (!this.props.image.isReady())
        {
            this
                .props
                .image
                .onUploadingProgress((event) => {
                    this.setState({
                        progressPercentValue: event.percent
                    });

                })
                .onUploadingComplete((result) => {
                    this.setState({
                        isComplete: true
                    });
                });
        }
        else
        {
            this.setState({
                isComplete: true
            });
        }
    }


    render = () => {

        const { progressPercentValue } = this.state;
        const { image, onDeleteImageHandler} = this.props;


        return (
            <div className="upload-image-preview upload-image-preview-inline">
                {
                    image.isReady()
                     ?
                    <div className="upload-picture-container">
                        <img src={image.getThumbs().preview}/>
                    </div>
                        :
                        <div className="upload-progress-container">
                            <CircularProgress className="upload-infinity-progress" />
                            <LinearProgress
                                className="upload-linear-progress"
                                mode="determinate"
                                value={progressPercentValue}
                            />
                        </div>
                }
            </div>);
    }
}

UploadImagePreview.propTypes = {
    image: PropTypes.object.isRequired,
    onDeleteImageHandler: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImagePreview);