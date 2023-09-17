import React from "react";
import { Link } from "react-router-dom";
import FLogo from "../../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";
import PanoBanner from "../banner/PanoBanner";
import PanoBanner2 from "../banner/PanoBanner2";
// import ImagePano1 from "../../../assets/img/pano/pano1.jpg";
// import ImagePano2 from "../../../assets/img/pano/pano2.jpg";
// import ImagePano3 from "../../../assets/img/pano/pano3.jpg";
import { useState } from "react";
import ImagePano1 from "../../../assets/img/pano/pano1.jpg";
import ImagePano2 from "../../../assets/img/pano/pano2.jpg";
import ImagePano3 from "../../../assets/img/pano/pano3.jpg";

const Slider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPreviousSlide = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="slider-container">
            <div className="slider">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>
            <button className="prev-button" onClick={goToPreviousSlide}>
                &lt;
            </button>
            <button className="next-button" onClick={goToNextSlide}>
                &gt;
            </button>
        </div>
    );
};
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Faites défiler en douceur
        });
    };

    const slides = [
        {
            image: ImagePano1,
            title: "Des moments inoubliables en famille au Mont Orford",
            subTitle: "Sortez en grand aux Mont Orford",
            interval: 1000,
        },
        {
            image: ImagePano2,
            title: "Plaisir et détente entre amis à Sand Banks",
            subTitle: "Sand Banks",
            interval: 1000,
        },
        {
            image: ImagePano3,
            title: "Exploration en plein air au Parc des Laurentides",
            subTitle: "Nature préservée et activités passionnantes",
            interval: 1000,
        },
    ];



    return (
        <>
            <div className="container-fluid p-0 m-0">
                <PanoBanner />
            </div>
            <div className="container-fluid">
                <footer className="d-flex flex-wrap align-items-center border-top">
                    <div className="col-sm-12 col-md-4">
                        <p className="mb-0 ps-4 text-muted m-2">© 2023 Jimmy-Steve, Inc</p>
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
