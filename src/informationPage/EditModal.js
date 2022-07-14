import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import {useBetween} from 'use-between';
import {useShareableState} from './UseBetween';
import axios from 'axios';
import {ipAddress} from '../constants';
import {useCookies} from 'react-cookie';
import PropTypes from 'prop-types';

axios.defaults.baseURL = ipAddress;

EditModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
  ingredient: PropTypes.object,
  setEditIngredientId: PropTypes.func,
};

function EditModal(props) {
  const handleClose = () => {
    props.setShow(false);
    props.setEditIngredientId(-1);
  };

  const [cookies] = useCookies(['token']);
  const [inputTextCosingRefNo, setInputTextCosingRefNo] = useState(
    props.ingredient['COSING Ref No'],
  );
  const [inputTextInciName, setInputTextInciName] = useState(
    props.ingredient['INCI name'],
  );
  const [inputTextInnName, setInputTextInnName] = useState(
    props.ingredient['INN name'],
  );
  const [inputTextPhEurName, setInputTextPhEurName] = useState(
    props.ingredient['Ph. Eur. Name'],
  );
  const [inputTextCasNo, setInputTextCasNo] = useState(
    props.ingredient['CAS No'],
  );
  const [inputTextEcNo, setInputTextEcNo] = useState(props.ingredient['EC No']);
  const [inputTextDescription, setInputTextDescription] = useState(
    props.ingredient['Chem/IUPAC Name / Description'],
  );
  const [inputTextRestriction, setInputTextRestriction] = useState(
    props.ingredient['Restriction'],
  );
  const [inputTextFunction, setInputTextFunction] = useState(
    props.ingredient['Function'],
  );

  const inputHandlerCosingRefNo = e => {
    setInputTextCosingRefNo(e);
  };
  const inputHandlerInciName = e => {
    setInputTextInciName(e);
  };
  const inputHandlerInnName = e => {
    setInputTextInnName(e);
  };
  const inputHandlerPhEurName = e => {
    setInputTextPhEurName(e);
  };
  const inputHandlerCasNo = e => {
    setInputTextCasNo(e);
  };
  const inputHandlerEcNo = e => {
    setInputTextEcNo(e);
  };
  const inputHandlerDescription = e => {
    setInputTextDescription(e);
  };
  const inputHandlerRestriction = e => {
    setInputTextRestriction(e);
  };
  const inputHandlerFunction = e => {
    setInputTextFunction(e);
  };

  const {setResponseSuccesfull, setShowResponse, setResponseError, setAction} =
    useBetween(useShareableState);

  const editIngredient = async () => {
    await axios(`/api/update/${props.ingredient.Id}`, {
      method: 'put',
      data: {
        inputTextCosingRefNo: inputTextCosingRefNo,
        inputTextInciName: inputTextInciName,
        inputTextInnName: inputTextInnName,
        inputTextPhEurName: inputTextPhEurName,
        inputTextCasNo: inputTextCasNo,
        inputTextEcNo: inputTextEcNo,
        inputTextDescription: inputTextDescription,
        inputTextRestriction: inputTextRestriction,
        inputTextFunction: inputTextFunction,
      },
      withCredentials: true,
      headers: {
        Authorization: cookies.token,
      },
    })
      .then(resp => {
        setAction('edit');
        if (resp.status === 204) {
          setResponseSuccesfull(true);
          setShowResponse(true);
          setResponseError(false);
          props.setShow(false);
          props.setEditIngredientId(-1);
          props.setRefresh(!props.refresh);
        }
      })
      .catch(function () {
        setAction('edit');
        setResponseSuccesfull(false);
        setShowResponse(true);
        setResponseError(true);
        props.setShow(false);
        props.setEditIngredientId(-1);
      });
  };

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.ingredient ? (
            <div>
              <div className="form-group">
                <label className="col-sm-2 control-label">COSING Ref No</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="number"
                    value={inputTextCosingRefNo}
                    onChange={event => {
                      inputHandlerCosingRefNo(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">INCI name</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextInciName}
                    onChange={event => {
                      inputHandlerInciName(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">INN name</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextInnName}
                    onChange={event => {
                      inputHandlerInnName(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">Ph. Eur. Name</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextPhEurName}
                    onChange={event => {
                      inputHandlerPhEurName(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">CAS No</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextCasNo}
                    onChange={event => {
                      inputHandlerCasNo(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">EC No</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextEcNo}
                    onChange={event => {
                      inputHandlerEcNo(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">
                  Chem/IUPAC Name / Description
                </label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextDescription}
                    onChange={event => {
                      inputHandlerDescription(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">Restriction</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextRestriction}
                    onChange={event => {
                      inputHandlerRestriction(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-2 control-label">Function</label>
                <div className="col-sm-10">
                  <input
                    className="form-control"
                    id="focusedInput"
                    type="text"
                    value={inputTextFunction}
                    onChange={event => {
                      inputHandlerFunction(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <b>Loading...</b>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editIngredient}>
            Edit
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default EditModal;
