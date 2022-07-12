import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./UseBetween";
import axios from "axios";
import { ipAddress } from "../constants";
import  { useCookies } from 'react-cookie';

axios.defaults.baseURL = ipAddress;

function AddNewModal(props) {
  const handleClose = () => {
    props.setShow(false);
  };

  const [cookies, setCookie] = useCookies(['token']);
  const [inputTextCosingRefNo, setInputTextCosingRefNo] = useState("");
  const [inputTextInciName, setInputTextInciName] = useState("");
  const [inputTextInnName, setInputTextInnName] = useState("");
  const [inputTextPhEurName, setInputTextPhEurName] = useState("");
  const [inputTextCasNo, setInputTextCasNo] = useState("");
  const [inputTextEcNo, setInputTextEcNo] = useState("");
  const [inputTextDescription, setInputTextDescription] = useState("");
  const [inputTextRestriction, setInputTextRestriction] = useState("");
  const [inputTextFunction, setInputTextFunction] = useState("");

  const inputHandlerCosingRefNo = (e) => {
    setInputTextCosingRefNo(e);
  };
  const inputHandlerInciName = (e) => {
    setInputTextInciName(e);
  };
  const inputHandlerInnName = (e) => {
    setInputTextInnName(e);
  };
  const inputHandlerPhEurName = (e) => {
    setInputTextPhEurName(e);
  };
  const inputHandlerCasNo = (e) => {
    setInputTextCasNo(e);
  };
  const inputHandlerEcNo = (e) => {
    setInputTextEcNo(e);
  };
  const inputHandlerDescription = (e) => {
    setInputTextDescription(e);
  };
  const inputHandlerRestriction = (e) => {
    setInputTextRestriction(e);
  };
  const inputHandlerFunction = (e) => {
    setInputTextFunction(e);
  };

  const {
    setResponseSuccesfull,
    showResponse,
    setShowResponse,
    responseError,
    setResponseError,
    action,
    setAction,
    setShowAddNew,
  } = useBetween(useShareableState);

  const addNewIngredient = async () => {
    await axios("/api/ingredient", {
      method: "post",
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
        'Authorization': cookies.token,
      }
      })
      .then((resp) => {
        setAction("adding new item");
        if (resp.status === 204) {
          setResponseError(false);
          setResponseSuccesfull(true);
          setShowResponse(true);
          props.setShow(false);
          props.setRefresh(!props.refresh);
        }
      })
      .catch(function (error) {
        setAction("adding new item");
        console.log(error);
        setResponseError(true);
        setResponseSuccesfull(false);
        setShowResponse(true);
        props.setShow(false);
      });
  };

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label className="col-sm-2 control-label">COSING Ref No</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  id="focusedInput"
                  type="number"
                  value={inputTextCosingRefNo}
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
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
                  onChange={(event) => {
                    inputHandlerFunction(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addNewIngredient}>
            Save
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewModal;
