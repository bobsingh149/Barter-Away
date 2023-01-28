import React, { useContext } from "react";

import { AuthContext } from "../../context/auth_context";

import { NavLink } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-item title" to="/">
          <i>BARTER AWAY</i>{" "}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link nav-item"
                aria-current="page"
                to="id/task"
              >
                Browse Barters
              </NavLink>
            </li>

            {auth.isLogin && (
              <li className="nav-item">
                <NavLink className="nav-link nav-item" to="/prodForm">
                  Add a product
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link nav-item" to="/showProd">
                Show All products
              </NavLink>
            </li>

                {auth.isLogin &&
            <li className="nav-item">
              <NavLink className="nav-link nav-item" to="/showMyProd">
                My Products
              </NavLink>
            </li>
}

            {auth.isLogin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link nav-item"
                  to="/auth"
                  onClick={() => {
                    auth.logout();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            )}

            {!auth.isLogin && (
              <li className="nav-item">
                <NavLink className="nav-link nav-item" to="/auth">
                  Login
                </NavLink>
              </li>
            )}

            <li className="dropdown">
              <NavLink
                className="nav-link dropdown-toggle nav-item"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More options
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Another action
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Something else here
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
