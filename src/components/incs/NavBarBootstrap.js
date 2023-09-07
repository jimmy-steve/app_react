import React from "react";
import { Link } from "react-router-dom";
import BlogDropdown from "./BlogDropdown"; // Importez votre composant BlogDropdown

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
    localStorage.removeItem("userLoggedIn");
    // localStorage.removeItem("token");
    window.location = "/";
  };

  render() {
    // Access the prop value using this.props.argumentToDisplay
    const { pageTitle } = this.props;

    return (
      <>
        <nav className="navbar m-1 navbar-expand-lg bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <h2 className="ms-1 font__sicknes">
              <Link to="/">
                <i className="fa-solid fa-skull-crossbones me-2 mt-1"></i>
            </Link>
              {pageTitle}
            </h2>


            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                 aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><i className="fa-solid fa-skull-crossbones me-2 mt-1"></i> De-Lafontaine</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 me-1">

                    {localStorage.getItem("token") ? (
                        <>
                          <li className="nav-item">
                            <Link
                                className="btn btn-outline-dark me-3"
                                to="/pictures/new"
                            >
                              Poster une photo
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                                className="btn btn-outline-dark me-3"
                                to="/dashboard"
                            >
                              <i className="fa-solid fa-house-user"></i>
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
                          <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                               aria-haspopup="true" aria-expanded="false">Try</a>
                            <div className="dropdown-menu">
                              <li><a className="dropdown-item"
                                     href="https://64da9dd2cc16ee008f7ba43a--dreamy-puffpuff-1d7ca0.netlify.app/">Super
                                react</a></li>
                              <li>
                                <Link  to="/#">
                                  3.0
                                </Link>
                                {/*<a className="dropdown-item" href="#">3.0</a>*/}
                              </li>
                              {/*<li><a className="dropdown-item" href="#">Super Forum</a></li>*/}
                              {/*<li><a className="dropdown-item" href="#">MealPlanner</a></li>*/}
                              {/*<li><a className="dropdown-item" href="#">Porte-Folio</a></li>*/}
                              {/*<li><a className="dropdown-item" href="#">Offroad</a></li>*/}
                              {/*<li><a className="dropdown-item" href="https://teal-manatee-eb9fae.netlify.app/">Projet*/}
                              {/*  React Country</a></li>*/}
                            </div>
                          </li>
                          <BlogDropdown /> {/* Utilisez le composant BlogDropdown ici */}
                          {/*<li className="nav-item dropdown">*/}
                          {/*  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"*/}
                          {/*     aria-haspopup="true" aria-expanded="false">Blog</a>*/}
                          {/*  <div className="dropdown-menu">*/}
                          {/*    <a className="dropdown-item" href="#">Action</a>*/}
                          {/*    <a className="dropdown-item" href="#">Another action</a>*/}
                          {/*    <a className="dropdown-item" href="#">Something else here</a>*/}
                          {/*  </div>*/}
                          {/*</li>*/}
                          <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link me-3" to="/">
                              Home
                            </Link>
                          </li>
                          <li className="nav-item mt-1">
                            <Link className="btn btn-sm btn-outline-dark me-3" to="/login">
                              Connexion
                            </Link>
                          </li>
                          <li className="nav-item mt-1">
                            <Link className="btn btn-sm btn-outline-dark" to="/register">
                              Register
                            </Link>
                          </li>
                        </>
                    )}
                </ul>
              </div>
            </div>












            {/*<div className="collapse navbar-collapse" id="navbarColor01">*/}
            {/*  <ul className="navbar-nav ms-auto me-5">*/}
            {/*    {localStorage.getItem("token") ? (*/}
            {/*      <>*/}
            {/*        <li className="nav-item">*/}
            {/*          <Link*/}
            {/*            className="btn btn-outline-dark me-3"*/}
            {/*            to="/pictures/new"*/}
            {/*          >*/}
            {/*            Poster une photo*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*        <li className="nav-item">*/}
            {/*          <button*/}
            {/*            className="btn btn-outline-dark me-2"*/}
            {/*            onClick={() => this.logout()}*/}
            {/*          >*/}
            {/*            Déconnexion*/}
            {/*          </button>*/}
            {/*        </li>*/}
            {/*      </>*/}
            {/*    ) : (*/}
            {/*      <>*/}
            {/*        <li className="nav-item">*/}
            {/*          <Link className="btn btn-outline-dark me-3" to="/login">*/}
            {/*            Connexion*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*        <li className="nav-item">*/}
            {/*          <Link className="btn btn-outline-dark" to="/register">*/}
            {/*            Register*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </ul>*/}
            {/*</div>*/}







          </div>
        </nav>
      </>
    );
  }
}

export default NavbarBootstrap;
