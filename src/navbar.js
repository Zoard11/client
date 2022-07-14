import React from 'react';
import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const logout = () => {
    localStorage.clear();
    removeCookie('token', {path: '/'});
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <b className="navbar-brand" href="#">
        Navbar
      </b>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        {localStorage.getItem('permission') === 'admin' && (
          <li className="nav-item">
            <Link className="nav-link" to="/upload">
              Upload
            </Link>
          </li>
        )}
        {localStorage.getItem('permission') === 'admin' && (
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        )}

        {!localStorage.getItem('token') && (
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login/Register
            </Link>
          </li>
        )}
      </ul>
      {localStorage.getItem('username') && (
        <span className="float-right">{localStorage.username}</span>
      )}

      {localStorage.getItem('token') && (
        <button className="nav-item mr-3 nav-link p-3" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
