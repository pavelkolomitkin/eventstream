import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';

class UploadImagePreview extends Component {

    state = {
        isComplete: false,
        progressPercentValue: 0,
        isError: false,
        picture: null
    };

    constructor(props, context)
    {
        super(props, context);
    }

    componentDidMount()
    {
        this
            .props
            .image
            .on('progress', (event) => {

                this.setState({
                    progressPercentValue: event.percent
                });

            })
            .end((error, result) => {
                if (error)
                {
                    this.setState({
                        isError: true
                    });
                }
                else
                {
                    console.log(result);
                    this.setState({
                        isComplete: true,
                        picture: result.body.picture
                    });
                }
            });
    }

    renderPreview()
    {
        if (this.state.picture)
        {
            return (
                <div className="upload-picture-container">
                    <img src={this.state.picture.thumbs.preview}  />
                </div>
            );
        }

        return (
            <div className="upload-picture-container">
                <img src={this.state.picture.thumbs.preview}  />
            </div>
        );
    }

    onPictureLoad = (event) => {
        this.setState({
            isComplete: true
        });
    };

    render = () => {

        return (
            <div className="upload-image-preview upload-image-preview-inline">
                {
                    this.state.picture !== null
                    &&
                    <div className="upload-picture-container">
                        <img src={this.state.picture.thumbs.preview} onLoad={this.onPictureLoad}/>
                    </div>
                }
                {   this.state.isComplete === false &&
                    <div className="upload-progress-container">
                        <CircularProgress className="upload-infinity-progress" />
                        <LinearProgress
                            className="upload-linear-progress"
                            mode="determinate"
                            value={this.state.progressPercentValue}
                        />
                    </div>
                }

            </div>);
    }
}

UploadImagePreview.propTypes = {};

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