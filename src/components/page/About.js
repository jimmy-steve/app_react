import React from "react";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import SideBar from "../incs/SideBar";
import {Link} from "react-router-dom";
import Footer from "../incs/Footer";
import Eclipse1 from "../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../assets/img/small-eclipse.svg";

const About = () => {

    return (
        <>
            {/* Barre de navigation */}
            <NavBarBootstrap pageTitle="About"/>
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
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    {/* Section de présentation */}
                                    <div className="col-md-12">
                                        <div className="row pe-4">


                                            <div className="container-card m-3">
                                                <div className="cercle"></div>
                                                <h2>Texte autour d'un cercle</h2>
                                                <p>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                                                    expedita
                                                    a, rem aperiam, minima repellendus dolorem, dicta natus quos odio
                                                    ducimus ullam quaerat quia porro? Nostrum a repellendus consequuntur
                                                    provident ducimus animi iure et suscipit recusandae reprehenderit
                                                    non
                                                    distinctio sed aspernatur iste, modi error harum officiis tempora
                                                    eligendi eos autem cupiditate enim doloribus temporibus? Impedit ut
                                                    eos
                                                    iure repudiandae sequi nobis saepe esse. Atque quisquam eos vitae
                                                    aliquid vero pariatur in nemo harum, perferendis libero obcaecati
                                                    placeat illum magnam deserunt, eveniet, delectus ipsa a. Laborum
                                                    dolor
                                                    molestiae quod maxime voluptatum.
                                                </p>
                                            </div>

                                            <div className="container-card m-3">
                                                <div className="cercle"></div>
                                                <h2>Texte autour d'un cercle</h2>
                                                <p>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                                                    expedita
                                                    a, rem aperiam, minima repellendus dolorem, dicta natus quos odio
                                                    ducimus ullam quaerat quia porro? Nostrum a repellendus consequuntur
                                                    provident ducimus animi iure et suscipit recusandae reprehenderit
                                                    non
                                                    distinctio sed aspernatur iste, modi error harum officiis tempora
                                                    eligendi eos autem cupiditate enim doloribus temporibus? Impedit ut
                                                    eos
                                                    iure repudiandae sequi nobis saepe esse. Atque quisquam eos vitae
                                                    aliquid vero pariatur in nemo harum, perferendis libero obcaecati
                                                    placeat illum magnam deserunt, eveniet, delectus ipsa a. Laborum
                                                    dolor
                                                    molestiae quod maxime voluptatum.
                                                </p>
                                            </div>

                                        </div>
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
}

export default About;