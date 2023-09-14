import React from "react";
import SideBar from "./incs/common/SideBar";
import NavBarBootstrap from "./incs/common/NavBarBootstrap";
import {Link} from "react-router-dom";
import Footer from "./incs/common/Footer";
import {Howl, Howler} from "howler";
import ClicSound from "../assets/mp3/sound1.wav";
import Banner from "./incs/banner/Banner";
import Eclipse1 from "../assets/img/big-eclipse.svg";
import Eclipse2 from "../assets/img/mid-eclipse.svg";
import Eclipse3 from "../assets/img/small-eclipse.svg";



const Home = () => {
    // Fonction pour jouer le son
    const playMusic = () => {
        const sound = new Howl({
            src: [ClicSound],
            autoplay: true,
            mute: false,
        });
    };


    return (
        <>
            <NavBarBootstrap pageTitle="De-Lafontaine"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col">
                        <div className="content">

                            <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                            <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <img className="super-logo" src={process.env.PUBLIC_URL + '/logo512.png'} alt="Logo React" />
                                        <h1 className="display-4">Hello my Friend !</h1>
                                        <p className="lead text-muted">
                                            Eh bien, bien, bien, regardez qui est arrivé dans mon saloon numérique.
                                        </p>
                                        <p className="lead">
                                            Je m'appelle <strong>Rusty</strong>, et je ne suis pas seulement de la
                                            rouille, je suis aussi un cowboy du React. <br/>
                                            Ouais, c'est ma petite portion de la frontière numérique.
                                        </p>
                                        <hr/>
                                        <p className="lead">
                                            Laissez-moi vous raconter une histoire à propos de ce petit coin de
                                            cyberespace. C'est comme mélanger une soupe React, vous voyez ? Jetez-y
                                            quelques légumes JSX, une pincée d'épices d'état, et laissez mijoter pour
                                            une fête frontale.
                                        </p>
                                        <p className="lead">
                                            Voici pour une fiesta de site web bien animée !
                                        </p>
                                        <p className="lead text-end">
                                            <button className="btn btn-primary btn-lg" onClick={playMusic}>
                                                Découvrir la Sagesse
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Home;
