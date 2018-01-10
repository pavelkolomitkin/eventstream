import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';


const ModalWindow = ({isOpen, children, onCloseHandler}) => {
    return (

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isOpen}
                onClose={onCloseHandler}
            >
                <div className="modal-window-content">
                { children }
                </div>
            </Modal>
    );
};

ModalWindow.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCloseHandler: PropTypes.func.isRequired
};

export default ModalWindow;