import React from "react";
import {Link} from "react-router-dom";
import FLogo from "../../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";
import Banner from "../banner/Banner";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Faites défiler en douceur
        });
    };

    return (
        <>

            <div className="container-fluid ">
                <footer className="d-flex flex-wrap justify-content-between align-items-center border-top border-dark">
                    <Banner/>
                    <p className="col-md-4 mb-0 text-muted">© 2023 Jimmy-Steve, Inc</p>

                    <a className="col-md-4 d-flex align-items-center justify-content-center">
                        <img className={"f-logo-footer"} src={FLogo} alt="logo"/>
                        <img className={"f-logo-footer-inverse"} src={FLogo} alt="logo"/>
                    </a>

                    <ul className="nav col-md-4 ">
                        <li className="nav-item">
                            <Link className="nav-link px-2 text-muted" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-2 text-muted" to="/blog/category/all">
                                Blog
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
                        <div className="scroll-to-top btn btn-outline-dark" onClick={scrollToTop}>
                            <i className="fa-solid fa-arrow-turn-up fa-xl"></i>
                        </div>
                    </ul>
                </footer>
            </div>
        </>
    );

};

export default Footer;

