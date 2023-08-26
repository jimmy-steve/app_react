import React from "react";
import { Link } from "react-router-dom";

class NavbarBootstrap extends React.Component {
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
    // Access the prop value using this.props.argumentToDisplay
    const { pageTitle } = this.props;

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <h1 className="ms-1">{pageTitle}</h1>
            {/* <Link className="navbar-brand me-5 h1" to="/">
              Delafon
            </Link> */}
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav ms-auto me-5">
                {localStorage.getItem("token") ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="btn btn-outline-light me-3"
                        to="/pictures/new"
                      >
                        Poster une photo
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-outline-dark me-2"
                        onClick={() => this.logout()}
                      >
                        Déconnexion
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light me-3" to="/login">
                        Connexion
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default NavbarBootstrap;
