import axios from "axios";
import React, { useState } from "react";
import { ipAddress } from "./constants";


axios.defaults.baseURL = `http://${ipAddress}`;

const UsersPage = () => {

 
  return (
    <div>
      <h1>Change user roles</h1>

    </div>
  );
};

export default UsersPage;
