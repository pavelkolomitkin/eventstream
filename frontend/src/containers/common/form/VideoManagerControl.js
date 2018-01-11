import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import VideoList from '../../../components/common/video/VideoList';

class VideoManagerControl extends Component {

    constructor(props, context)
    {
        super(props, context);


    }

    render = () => {
        const {videos} = this.props;

        return (
            <div>
                <VideoList videos={videos} />
                <div className="video-preparing-list">

                </div>
                <div>
                    <Button>
                        <AddIcon/>Add video
                    </Button>
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