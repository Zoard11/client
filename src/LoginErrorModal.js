import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function LoginErrorModal(props) {
  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.action} error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Error occurred during {props.action}.</b>
          {props.message && <b> {props.message}</b>}
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

export default LoginErrorModal;
