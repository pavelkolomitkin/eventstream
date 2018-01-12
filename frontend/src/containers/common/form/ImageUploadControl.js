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
import { Carousel } from 'react-responsive-carousel';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import ModalWindow from "../../../components/common/ModalWindow";
import FileUpload from 'material-ui-icons/FileUpload';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class ImageUploadControl extends Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            pictures: [],
            selectedFiles: {},
            isCarouselOpen: false,
            selectedPictureIndex: 0
        };

        this.eventPictureService = ApiServiceFactory.createEventPictureService();

        this.onDropUploadFilesHandler = this.onDropUploadFilesHandler.bind(this);
        this.onDeletePictureHandler = this.onDeletePictureHandler.bind(this);
        this.onPreviewClickHandler = this.onPreviewClickHandler.bind(this);
        this.onCloseCarouselWindow = this.onCloseCarouselWindow.bind(this);
    }

    onCloseCarouselWindow = () => {
        this.setState({
            isCarouselOpen: false
        });
    };

    onPreviewClickHandler = (image, index) => {
        this.setState({
            isCarouselOpen: true,
            selectedPictureIndex: index
        });
    };

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

    componentDidMount()
    {
        this.setState({
            pictures: this.props.images.map((image) => {
                return UploadedImageAdapter.createFromUploadedImage(image);
            })
        });
    }


    onDeletePictureHandler = (picture) => {
        const self = this;
        this.eventPictureService.remove(
            picture.getId(),
            (result) => {

                // удалить из props
                let imageIndex = self.props.images.findIndex((image) => {
                    return (image.id === picture.getId());
                });

                self.props.images.splice(imageIndex, 1);


                // удалить из state
                imageIndex = self.state.pictures.findIndex((image) => {
                    return (image.getId() === picture.getId());
                });

                let newPictures = self.state.pictures;
                newPictures.splice(imageIndex, 1);

                this.setState({
                    pictures: newPictures
                });
            },
            (error) => {
                console.log(error);
            }
            );
    };

    render = () => {

        return (
            <div>
                <ModalWindow isOpen={this.state.isCarouselOpen} onCloseHandler={this.onCloseCarouselWindow}>
                    <div className="modal-picture-content">
                        <Carousel showArrows={true} showThumbs={false} selectedItem={this.state.selectedPictureIndex}>

                            {
                                this.state.pictures.map((picture, index) => {

                                    const thumbs = picture.getThumbs();
                                    return (

                                            thumbs !== null ?
                                            <div key={index}>
                                                <img src={thumbs.normal} />
                                            </div>
                                            : null
                                        );
                                    })
                            }
                        </Carousel>
                    </div>
                </ModalWindow>


                <div className="upload-images-list">

                    {this.state.pictures.map((picture, index) => {

                        return (<UploadImagePreview
                            key={picture.getId()}
                            image={picture}
                            onImageClickHandler={(image) => {this.onPreviewClickHandler(image, index)}}
                            onDeleteImageHandler={this.onDeletePictureHandler}
                        />);
                    })}

                </div>
                <div style={{clear: 'both'}}/>
                <div className="upload-button-container">
                    <Dropzone maxSize={this.props.maxImageSize} onDrop={this.onDropUploadFilesHandler} multiple={true}>
                        <Button raised color="default">
                            Upload
                            <FileUpload />
                        </Button>
                    </Dropzone>
                </div>
            </div>
        );
    }
}

ImageUploadControl.propTypes = {
    maxImageSize: PropTypes.number.isRequired,
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