import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const CustomModal = (props) => {
  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className={`modal-dialog-centered`} {...props}>
      <ModalHeader toggle={props.toggle}>

        {props.header}

      </ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
    </Modal>
  );
};

CustomModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

CustomModal.defaultpropTypes = {
  isOpen: false,
  modal: "false",
};

export default CustomModal;