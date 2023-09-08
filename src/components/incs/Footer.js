import React from "react";
import {Link} from "react-router-dom";
import FLogo from "../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";

const Footer = () => {

    return (
            <div className="container-fluid ">
                <footer className="d-flex flex-wrap justify-content-between align-items-center border-top border-dark">
                    <p className="col-md-4 mb-0 text-muted">© 2023 Jimmy-Steve, Inc</p>

                    <a className="col-md-4 d-flex align-items-center justify-content-center">
                        <img className={"f-logo-footer"} src={FLogo} alt="logo" />
                        <img className={"f-logo-footer-inverse"} src={FLogo} alt="logo" />
                    </a>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link px-2 text-muted" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-2 text-muted px-2 text-muted" to="/readme">
                                READ.md
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-2 text-muted px-2 text-muted" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item"><i className="fa-solid fa-arrow-turn-up fa-xl"></i></li>
                    </ul>
                </footer>
            </div>
    );

};

export default Footer;

