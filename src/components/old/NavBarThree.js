import React from "react";
import { Link } from "react-router-dom";

class NavBarThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.token = null;
  }
  logout = () => {
    localStorage.setItem("token", "");
    localStorage.clear();
    this.setState({ token: null });
    // localStorage.removeItem("token");
    // window.location = "/";
  };
  render() {
    return (
      <nav class="navbar navbar-expand navbar-dark sticky-top px-4 py-0">
        <a href="/3.0" class="navbar-brand d-flex d-lg-none me-4">
          <h2 class="text-primary mb-0">
            <i class="fa-solid fa-skull-crossbones fa"></i>
          </h2>
        </a>
        <a href="#" class="sidebar-toggler flex-shrink-0">
          <i class="fa fa-bars"></i>
        </a>

        <div class="navbar-nav align-items-center ms-auto">
          {localStorage.getItem("token") ? (
            <>
              <li className="nav-item">
                <Link className="btn btn-info me-3" to="/pictures/new">
                  Poster une photo
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-info me-2"
                  onClick={() => this.logout()}
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="btn btn-info me-3" to="/login">
                  Connexion
                </Link>
              </li>
              <li>
                <Link className="btn btn-outline-info me-2" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
    );
  }
}
export default NavBarThree;
