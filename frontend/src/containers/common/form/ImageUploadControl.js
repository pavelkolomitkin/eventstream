import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import UploadImagePreview from './UploadImagePreview';
import Dropzone from 'react-dropzone';
import ApiServiceFactory from '../../../services/ApiServiceFactory';
import UploadedImageList from './UploadedImageList';
import UploadedImageAdapter from './UploadedImageAdapter';

class ImageUploadControl extends Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            pictures: [],
            selectedFiles: {}
        };

        this.eventPictureService = ApiServiceFactory.createEventPictureService();

        this.onDropUploadFilesHandler = this.onDropUploadFilesHandler.bind(this);
        this.onDeletePictureHandler = this.onDeletePictureHandler.bind(this);
    }

    onDropUploadFilesHandler = (acceptedFiles, rejectedFiles) => {
        const uploadWorkers = acceptedFiles
            .filter((file) => {
                if (!this.state.selectedFiles[file.name])
                {
                    return file;
                }
            })
            .map((file, index) => {
                this.state.selectedFiles[file.name] = file;
                return UploadedImageAdapter.createUploadWorker(file);
            });

        const self = this;
        uploadWorkers.forEach((worker) => {
            worker.onUploadingComplete((result) => {
                self.props.images.push(result.body.picture);
            });
        });

        const {pictures} = this.state;

        this.setState({
            pictures: [...pictures, ...uploadWorkers]
        });
    };

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            pictures: nextProps.images.map((image) => {
                return UploadedImageAdapter.createFromUploadedImage(image);
            })
        });
    }


    onDeletePictureHandler = (picture) => {
        this.eventPictureService.remove(
            picture.id,
            (result) => {

            },
            () => {

            }
            );
    };




    render = () => {

        return (
            <div>

                <div className="upload-images-list">

                    {this.state.pictures.map((picture, index) => {

                        return (<UploadImagePreview key={picture.getId()} image={picture} onDeleteImageHandler={this.onDeletePictureHandler} />);
                    })}

                </div>
                <div style={{clear: 'both'}}/>
                <div className="upload-button-container">
                    <Dropzone maxSize={this.props.maxImageSize} onDrop={this.onDropUploadFilesHandler} multiple={true} />
                </div>
            </div>
        );
    }
}

ImageUploadControl.propTypes = {
    maxImageSize: PropTypes.number.isRequired,
    onImageUploadHandler: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadControl);