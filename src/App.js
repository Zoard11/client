import React, { Component } from "react";
import { Route } from "react-router-dom";
import InformationPage from "./informationPage/InformationPage";
import UploadPage from "./uploadPage/uploadPage";
import LoginPage from "./loginPage/LoginPage";
import UsersPage from "./usersPage/UsersPage";
import NavBar from "./navbar";
import { BrowserRouter, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App ">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<InformationPage />} />
          <Route exact path="/upload" element={<UploadPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/users" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
