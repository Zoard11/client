import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';


UploadModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setShowSuccessfull: PropTypes.func,
  showSuccessfull: PropTypes.bool,
  showFailed: PropTypes.bool,
  setShowFailed: PropTypes.func,
};

function UploadModal(props) {
  const handleClose = () => {
    props.setShowSuccessfull(false);
    props.setShowFailed(false);
    props.setShow(false);
  };

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.showSuccessfull && <b>Successfull upload!</b>}
          {props.showFailed && <b>Error occurred during upload.</b>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UploadModal;
