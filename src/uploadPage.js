import axios from "axios";
import React, { useState } from "react";
import { ipAddress } from "./constants";
import UploadModal from "./UploadModal";

axios.defaults.baseURL = ipAddress;

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [file, setFile] = useState({});

  const [showSuccessfullUploadMessage, setShowSuccessfullUploadMessage] =
    useState(false);
  const [showFailedUploadMessage, setShowFailedUploadMessage] = useState(false);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFile(event.target);
  };

  const onFileUpload = () => {
    try {
      const formData = new FormData();

      formData.append("file", selectedFile, selectedFile.name);

      axios
        .post("/api/uploadfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((resp) => {
          if (resp.status === 204) {
            setShowSuccessfullUploadMessage(true);
            setShowFailedUploadMessage(false);
          }

          setShowMessage(true);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setShowFailedUploadMessage(true);
            setShowSuccessfullUploadMessage(false);
            setShowMessage(true);
          } else if (error.request) {
            console.log(error.request);
            setShowFailedUploadMessage(true);
            setShowSuccessfullUploadMessage(false);
            setShowMessage(true);
          } else {
            console.log("Error", error.message);
            setShowFailedUploadMessage(true);
            setShowSuccessfullUploadMessage(false);
            setShowMessage(true);
          }
          console.log(error.config);
        });
    } catch (error) {
      setShowFailedUploadMessage(true);
      setShowSuccessfullUploadMessage(false);
      setShowMessage(true);
    }
    setSelectedFile({});
    file.value = "";
  };

  const isEmpty = (obj) => {
    for (const value in obj) {
      return false;
    }
    return true;
  };

  const fileData = () => {
    if (!isEmpty(selectedFile)) {
      console.log(selectedFile);
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Cosmetics database</h1>
      <h3>Upload a csv file!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
      <UploadModal
        showSuccessfull={showSuccessfullUploadMessage}
        showFailed={showFailedUploadMessage}
        setShowSuccessfull={setShowSuccessfullUploadMessage}
        setShowFailed={setShowFailedUploadMessage}
        show={showMessage}
        setShow={setShowMessage}
      />
    </div>
  );
};

export default UploadPage;
