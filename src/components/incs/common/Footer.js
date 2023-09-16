import React from "react";
import { Link } from "react-router-dom";
import FLogo from "../../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";
import PanoBanner from "../banner/PanoBanner";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Faites défiler en douceur
        });
    };

    return (
        <>
            <div className="container-fluid p-0 m-0">
                <PanoBanner />
            </div>
            <div className="container-fluid">
                <footer className="d-flex flex-wrap align-items-center border-top">
                    <div className="col-sm-12 col-md-4">
                        <p className="mb-0 ps-4 text-muted">© 2023 Jimmy-Steve, Inc</p>
                    </div>
                    <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
                        <img className="f-logo-footer" src={FLogo} alt="logo" />
                        <img className="f-logo-footer-inverse" src={FLogo} alt="logo" />
                    </div>
                    <div className="col-sm-12 col-md-4 bottom-nav">
                        <ul className="nav justify-content-end">
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
                                <Link className="nav-link px-2 text-muted" to="/readme">
                                    READ.md
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 text-muted" to="/about">
                                    About
                                </Link>
                            </li>
                            <div className="scroll-to-top btn btn-outline-dark" onClick={scrollToTop}>
                                <i className="fa-solid fa-arrow-turn-up fa-xl"></i>
                            </div>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Footer;
