import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
//import SessionManager from '../../../services/SessionManager';
import AddIcon from 'material-ui-icons/Add';
import UploadImagePreview from './UploadImagePreview';
import Dropzone from 'react-dropzone';
import ApiServiceFactory from '../../../services/ApiServiceFactory';
//import uploader from 'superagent';




class ImageUploadControl extends Component {

    constructor(props, context)
    {
        super(props, context);


        this.state = {
            pictures: []
        };


        this.uploader = ApiServiceFactory.createFileUploader();
    }

    onDropUploadFilesHandler = (acceptedFiles, rejectedFiles) => {

        const uploadWorkers = acceptedFiles.map((file, index) => {
            return this.uploader.uploadEventPicture(file);
        });

        this.setState({
            pictures: uploadWorkers
        });
    };


    render = () => {

        return (


            <div>

                <div className="upload-images-list">

                    {this.state.pictures.map((picture, index) => {
                        return (<UploadImagePreview key={index} className="upload-image-preview-inline" image={picture}/>);
                    })}

                </div>
                <div style={{clear: 'both'}}/>
                <div className="upload-button-container">
                    <Dropzone onDrop={this.onDropUploadFilesHandler} multiple={true}/>
                </div>
            </div>
        );
    }
}

ImageUploadControl.propTypes = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadControl);