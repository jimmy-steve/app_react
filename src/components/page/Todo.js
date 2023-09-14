import React, { useState, useEffect } from "react";
import NavBarBootstrap from "../incs/common/NavBarBootstrap";
import SideBar from "../incs/common/SideBar";
import Footer from "../incs/common/Footer";
import Eclipse1 from "../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../assets/img/small-eclipse.svg";

const TypingEffect = () => {
    const [text, setText] = useState("");
    const textToType = ` import React, { useState, useEffect } from "react";
import NavBar from "../incs/common/NavBar";
import SideBar from "../incs/common/SideBar";
import Footer from "../incs/common/Footer";

const TypingEffect = () => {
    const [text, setText] = useState("");
    const textToType = "Ceci est un effet de dactylographie.";
    const typingSpeed = 100;

    useEffect(() => {
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex < textToType.length) {
                setText((prevText) => prevText + textToType.charAt(currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => {
            clearInterval(typingInterval);
        };
    }, []);

    return <pre>{text}</pre>;
};

const Todo = () => {
    return (
        <>
            <NavBar pageTitle="About" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-10">
                        <div className="content">
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    <div className="col-md-12">
                                        <div className="row pe-4">
                                            <TypingEffect />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Todo;
    `;
    const typingSpeed = 100; // Vitesse de frappe en millisecondes

    useEffect(() => {
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex < textToType.length) {
                setText((prevText) => prevText + textToType.charAt(currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => {
            clearInterval(typingInterval);
        };
    }, []);

    return <pre>{text}</pre>;
};

const Todo = () => {
    return (
        <>
            <NavBarBootstrap pageTitle="About" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-10">
                        <div className="content">
                            <img className="big-circle" src={Eclipse1} alt="Eclipse1" />
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle" />
                            <img className="small-circle" src={Eclipse3} alt="small-circle" />
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    <div className="col-md-12">
                                        <div className="row pe-4">
                                            <div className="text-center">
                                                En construction
                                            </div>
                                            <TypingEffect />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Todo;
