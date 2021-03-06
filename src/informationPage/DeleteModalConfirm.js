import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useBetween} from 'use-between';
import {useShareableState} from './UseBetween';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import PropTypes from 'prop-types';

DeleteModalConfirm.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
  setDeleteIngredientId: PropTypes.func,
  deleteIngredientId: PropTypes.number,
};

function DeleteModalConfirm(props) {
  const {setResponseSuccesfull, setShowResponse, setResponseError, setAction} =
    useBetween(useShareableState);

  const handleClose = () => {
    props.setShow(false);
    props.setDeleteIngredientId(-1);
  };

  const [cookies] = useCookies(['token']);

  const deleteIngredient = async () => {
    await axios
      .delete(`/api/ingredients/${props.deleteIngredientId}`, {
        withCredentials: true,
        headers: {
          Authorization: cookies.token,
        },
      })
      .then(resp => {
        setAction('delete');
        if (resp.status === 204) {
          setResponseSuccesfull(true);
          setShowResponse(true);
          setResponseError(false);
          props.setShow(false);
          props.setRefresh(!props.refresh);
        }
      })
      .catch(function (error) {
        console.log(error);
        setAction('delete');
        setResponseSuccesfull(false);
        setShowResponse(true);
        setResponseError(true);
        props.setShow(false);
      });
    props.setShow(false);
    props.setDeleteIngredientId(-1);
  };

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the ingredient?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteIngredient}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteModalConfirm;
