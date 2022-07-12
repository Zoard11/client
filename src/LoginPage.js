import axios from "axios";
import React, { useState } from "react";
import { ipAddress } from "./constants";
import UploadModal from "./UploadModal";
import  { useCookies } from 'react-cookie';

axios.defaults.baseURL = ipAddress;

const LoginPage = () => {

  const [cookies, setCookie] = useCookies(['token']);

  const [inputTextUsername, setInputTextUsername] = useState("");
  const [inputTextPassword, setInputTextPassword] = useState("");

  const [inputTextName, setInputTextName] = useState("");
  const [inputTextPasswordRegister, setInputTextPasswordRegister] = useState("");
  const [inputTextPasswordRegisterRepeat, setInputTextPasswordRegisterRepeat] = useState("");

  const inputHandlerUsername = (e) => {
    setInputTextUsername(e);
  };
  const inputHandlerPassword = (e) => {
    setInputTextPassword(e);
  };
  

  const inputHandlerName = (e) => {
    setInputTextName(e);
  };
  const inputHandlerPasswordRegister = (e) => {
    setInputTextPasswordRegister(e);
  };
  const inputHandlerPasswordRegisterRepeat = (e) => {
    setInputTextPasswordRegisterRepeat(e);
  };

  const login = async () => {
    await axios
      .post("/api/auth/login", {
        data: {
          username : inputTextUsername,
          password : inputTextPassword,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          const token  =  resp.data.token;
          const permission  =  resp.data.permission;
          const username  =  resp.data.username;
          localStorage.setItem("token", token);
          localStorage.setItem("permission", permission);
          localStorage.setItem("username", username);
          setCookie('token', token, { path: '/' });
          window.location.href = '/';
        } else{
          console.log(resp);
        }
      })
      .catch(function (error) {

        console.log(error);

      });
  };

  const register = async () => {
    await axios
      .post("/api/auth/register", {
        data: {
          username : inputTextName,
          password : inputTextPasswordRegister,
          password2 : inputTextPasswordRegisterRepeat,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          const token  =  resp.data.token;
          const permission  =  resp.data.permission;
          const username  =  resp.data.username;
          localStorage.setItem("token", token);
          localStorage.setItem("permission", permission);
          localStorage.setItem("username", username);
          setCookie('token', token, { path: '/' });
          window.location.href = '/';
        } else{
          console.log(resp);
        }
      })
      .catch(function (error) {

        console.log(error);

      });
  };

  return (
      <React.Fragment>

          <div id="wrapper">
          <div className="item">
          <h1>Login</h1>


            <div className="form-outline mb-4">
            <label >Username</label>
              <input type="name"  className="form-control" value={inputTextUsername} onChange={(event) => {
                    inputHandlerUsername(event.target.value);
                  }} />
              
            </div>


            <div className="form-outline mb-4">
              
              <label >Password</label>
              <input type="password" className="form-control" value={inputTextPassword} onChange={(event) => {
                    inputHandlerPassword(event.target.value);
                  }}/>
            </div>

            <button type="button" className="btn btn-primary btn-block mb-4" onClick={login} >Sign in</button>


        </div>

        <div className="item">
        <h1>Register</h1>


        <div className="form-outline mb-4">
            <label  >Username</label>
              <input type="name"  className="form-control" value={inputTextName} onChange={(event) => {
                    inputHandlerName(event.target.value);
                  }}  />
              
            </div>



            <div className="form-outline mb-4">
              
              <label className="form-label">Password</label>
              <input type="password"  className="form-control" value={inputTextPasswordRegister} onChange={(event) => {
                    inputHandlerPasswordRegister(event.target.value);
                  }}  />
            </div>

            <div className="form-outline mb-4">
              
              <label className="form-label" >Repeat password</label>
              <input type="password"  className="form-control" value={inputTextPasswordRegisterRepeat} onChange={(event) => {
                    inputHandlerPasswordRegisterRepeat(event.target.value);
                  }} />
            </div>

            <button type="button" className="btn btn-primary btn-block mb-4" onClick={register}>Register</button>

        </div>

          </div>
        </React.Fragment>
  );

};

export default LoginPage;
