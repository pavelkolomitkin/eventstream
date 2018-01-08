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
        isError: false
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

                /* the event is:
                {
                  direction: "upload" or "download"
                  percent: 0 to 100 // may be missing if file size is unknown
                  total: // total file size, may be missing
                  loaded: // bytes downloaded or uploaded so far
                } */

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
                        isComplete: true
                    });
                }
            });
    }

    renderPreview()
    {
        return (
            <div className="upload-picture-container">

            </div>
        );
    }

    render = () => {

        return (
            <div className="upload-image-preview upload-image-preview-inline">
                {
                    this.state.isComplete || this.state.isError
                        ?
                        this.renderPreview()
                        :
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