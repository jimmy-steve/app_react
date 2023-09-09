import React from "react";
import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import Footer from "../incs/Footer";
import { Link } from "react-router-dom";
import Eclipse1 from "../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../assets/img/small-eclipse.svg";

// Composant Readme qui affiche des informations pour les clients
const Readme = () => {
  return (
      <>
        {/* Barre de navigation */}
        <NavBarBootstrap pageTitle="README.md" />
        <div className="container-fluid m-1">
          <div className="row">
            {/* Barre latérale */}
            <div className="col-2 p-0 sidebar">
              <SideBar />
            </div>
            <div className="col-md-10">
              <div className="content">
                <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                <img className="small-circle" src={Eclipse3} alt="small-circle"/>


                <div className="container-fluid px-4">
                  <div className="row g-4">
                    {/* Section de présentation */}
                    <div className="col-md-12 mt-5">
                      <h1 className="display-4">Bienvenue dans votre application</h1>
                      <p className="lead">
                        Notre application vous offre une expérience unique pour gérer des blogs, des recettes et des photos.
                      </p>
                      <p className="lead">
                        Explorez, partagez et découvrez du contenu passionnant !
                      </p>
                      <hr />
                      {/* Section d'utilisation */}

                      <p className="utilisation-texte">
                        <h2>Comment utiliser l'application</h2>
                        Pour commencer à utiliser notre application, suivez ces étapes simples :
                        <ul>
                          <li>Créez un compte ou connectez-vous si vous en avez déjà un.</li>
                            <li>Explorez les différents blogs, recettes et photos disponibles.</li>
                                <li>Créez vos propres publications, partagez vos recettes ou téléchargez vos photos.</li>
                                    <li>Interagissez avec d'autres utilisateurs en commentant et en aimant leurs contenus.</li>
                        </ul>
                      </p>
                      {/* Section de contact */}
                      <h2>Zone contact</h2>
                      <Link id="super-btn" type="button" to="" className="super-btn mt-3 mb-3">Click me</Link>
                      <p>
                        Si vous avez des questions, des préoccupations ou des suggestions, n'hésitez pas à nous contacter.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pied de page */}
        <Footer />
      </>
  );
};

export default Readme;
