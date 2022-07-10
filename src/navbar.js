import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <b class="navbar-brand" href="#">
          Navbar
        </b>
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/upload">
              Upload
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
