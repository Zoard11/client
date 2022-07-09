import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalResponse(props) {
  const handleClose = () => {
    props.setShow(false);
    props.setShowSuccessfull(false);
    props.setShowFailed(false);
  };

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.showSuccessfull && <b>Successfull {props.action}!</b>}
          {props.showFailed && <b>Error occurred during {props.action}.</b>}
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

export default ModalResponse;
