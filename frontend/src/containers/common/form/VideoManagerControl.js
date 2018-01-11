import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import AddIcon from 'material-ui-icons/Add';
import VideoList from '../../../components/common/form/VideoList';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Input, { InputLabel } from 'material-ui/Input';
import {
    TextField,
    FormHelperText,
    FormControl
} from 'material-ui';

import ApiServiceFactory from '../../../services/ApiServiceFactory';

class VideoManagerControl extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            formOpen: false,
            anchorEl: null,
            videoUrl: '',
            videoPreparing: false,
            preparingErrorMessage: ''
        };

        this.formButton = null;
        this.videoService = ApiServiceFactory.createVideoService();

        this.onDeleteVideoHandler = this.onDeleteVideoHandler.bind(this);
    }

    handleClose = () => {
        this.setState({
            formOpen: false
        });
    }

    onDeleteVideoHandler = (video) => {
        console.log(video);
    }

    onFormButtonClickHandler = (event) => {
        this.setState({
            formOpen: true
        });
    }

    onVideoUrlChangeHandler = (event) => {
        this.setState({
            videoUrl: event.target.value
        });
    }

    onVideoFormClickButtonHandler = () => {
        const videoUrl = this.state.videoUrl.trim();
        if (videoUrl !== '')
        {
            this.videoService.create(
                videoUrl,
                (video) => {
                    this.props.videos.push(video);
                    this.setState({
                        videoPreparing: false,
                        videoUrl: '',
                        formOpen: false,
                        preparingErrorMessage: ''
                    });
                },
                (error) => {
                    this.setState({
                        videoPreparing: false,
                        preparingErrorMessage: error
                    });
                }
            );


            this.setState({
                videoPreparing: true
            });
        }
    }

    componentDidMount()
    {
        this.setState({
            anchorEl: findDOMNode(this.formButton)
        });
    }

    render = () => {

        const { formOpen, anchorEl, videoPreparing, preparingErrorMessage } = this.state;
        const { videos } = this.props;
        return (
            <div>
                <VideoList videos={videos} onDeleteItemHandler={this.onDeleteVideoHandler} />
                <div>
                    <Button onClick={this.onFormButtonClickHandler} ref={(button) => { this.formButton = button; }} raised color="default">
                        <AddIcon/>Add video
                    </Button>
                    <Popover
                        open={formOpen}
                        anchorEl={anchorEl}
                        anchorReference="anchorEl"
                        anchorPosition={{ top: 200, left: 300 }}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Paper elevation={4}>
                            <div className="video-form-container">
                                <form>
                                    { videoPreparing &&  <CircularProgress className="progress" /> }
                                    <Typography>Add video link</Typography>
                                    <FormControl className="form-control" error aria-describedby="video-url-error">
                                        <TextField
                                            value={this.state.videoUrl}
                                            disabled={videoPreparing}
                                            margin="normal"
                                            label="Video url"
                                            onChange={this.onVideoUrlChangeHandler}
                                        />
                                        {/*<Input id="name-disabled" value={this.state.videoUrl} disabled={videoPreparing} onChange={this.onVideoUrlChangeHandler} />*/}
                                        { preparingErrorMessage !== '' && <FormHelperText id="video-url-error">{ preparingErrorMessage }</FormHelperText> }
                                    </FormControl>
                                    <FormControl className="form-control">
                                        <Button onClick={this.onVideoFormClickButtonHandler} raised color="primary" disabled={(this.state.videoUrl.trim() === '') || videoPreparing}>
                                            Add
                                        </Button>
                                    </FormControl>

                                </form>

                            </div>
                        </Paper>

                    </Popover>
                </div>

            </div>);
    }
}

VideoManagerControl.propTypes = {
    videos: PropTypes.array.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoManagerControl);