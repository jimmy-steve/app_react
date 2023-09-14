import React from "react";
import SideBar from "../incs/common/SideBar";
import NavBarBootstrap from "../incs/common/NavBarBootstrap";
import Footer from "../incs/common/Footer";
import Eclipse1 from "../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../assets/img/small-eclipse.svg";

import SuperGallery from "../incs/photo/SuperGallery";
import LogoJS from "../../assets/logos/JsLogo.png";
import LogoReact from "../../assets/logos/ReactLogo.png";
import LogoNext from "../../assets/logos/NextLogo.png";

import NodeJSLogo from "../../assets/logos/NodeJSLogo.png";
import NodeTSLogo from "../../assets/logos/TypescriptLogo.png";
import FLogo from "../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";
import FtoLogo from "../../assets/logos/f-low-resolution-color-logo.png";

import SqlLogo from "../../assets/logos/SqlLogo.png";


const Script = () => {
    return (
        <>
            {/* Barre de navigation */}
            <NavBarBootstrap pageTitle="Script"/>
            <div className="container-fluid m-1">
                <div className="row">
                    {/* Barre latérale */}
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">
                        <div className="content">
                            <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                            <img className="small-circle" src={Eclipse3} alt="small-circle"/>
                            <div className="logo-super-banner">
                                <div className="row">
                                    <img src={LogoJS} alt={"Alt"}/>
                                    <img src={FtoLogo} alt={"Alt"}/>

                                    <img className="f-banner-logo" src={FLogo} alt={"Alt"}/>

                                    <img src={NodeJSLogo} alt={"Alt"}/>
                                    <img  src={NodeTSLogo} alt={"Alt"}/>
                                    <img src={NodeJSLogo} alt={"Alt"}/>

                                    <img className="f-banner-logo" src={FLogo} alt={"Alt"}/>

                                    <img src={FtoLogo} alt={"Alt"}/>
                                    <img src={LogoReact} alt={"Alt"}/>

                                    <img src={FtoLogo} alt={"Alt"}/>

                                    <img  src={NodeTSLogo} alt={"Alt"}/>

                                </div>

                            </div>







                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    {/* Section de présentation */}
                                    <div className="block">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pied de page */}
            <Footer/>
        </>
    );
};

export default Script;
