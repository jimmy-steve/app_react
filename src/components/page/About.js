import React from "react";
import NavBarBootstrap from "../incs/common/NavBarBootstrap";
import Footer from "../incs/common/Footer";
import Eclipse1 from "../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../assets/img/small-eclipse.svg";
import ContactForms from "../incs/common/ContactForms";

const About = () => {

    return (
        <>
            {/* Barre de navigation */}
            <NavBarBootstrap pageTitle="About"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-md-12">
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
                                                <div className="cercle c1"></div>
                                                <h2 className="pt-2 text-success">About Me</h2>
                                                <h5>Je suis Francis,<br/> le fondateur et directeur de DevMaster.</h5>
                                                <p>
                                                    Depuis mes premiers pas dans le monde de la programmation, j'ai été fasciné par la puissance de la technologie pour transformer notre façon de vivre et de travailler. Au fil des années, j'ai acquis une solide expertise dans le domaine, et c'est cette passion qui m'a poussé à créer DevMaster.

                                                    Mon parcours professionnel m'a permis de travailler sur une multitude de projets informatiques variés, allant de l'élaboration de logiciels d'entreprise complexes à la création de sites web innovants.
                                                    Chez DevMaster, nous croyons en la capacité de la programmation à résoudre des problèmes, à stimuler la créativité et à améliorer l'efficacité des entreprises.
                                                </p>
                                            </div>
                                            <div className="container-card m-3">
                                                <div className="cercle c2"></div>
                                                <h2 className="text-center mt-2 text-success">DevMaster</h2>
                                                <p>
                                                    DevMaster est une entreprise fictive spécialisée dans le développement logiciel et la programmation. Notre équipe dévouée de développeurs et d'experts en informatique travaille sans relâche pour créer des solutions informatiques de pointe qui répondent aux besoins de nos clients.
                                                </p>
                                                <p>
                                                    Notre approche repose sur l'innovation, la qualité et l'engagement envers l'excellence technique. Que vous ayez besoin d'une application mobile sur mesure, d'une plateforme e-commerce robuste ou de conseils en matière de technologie, nous sommes là pour vous accompagner.
                                                </p>
                                                <p>
                                                    Chez DevMaster, nous sommes convaincus que la technologie peut transformer votre entreprise et améliorer votre vie. Nous nous engageons à fournir des solutions de programmation de classe mondiale qui vous aident à réussir dans un monde de plus en plus numérique.
                                                </p>
                                                <p>
                                                    Merci de visiter notre page "À propos" et de découvrir comment DevMaster peut vous aider à réaliser vos projets technologiques. N'hésitez pas à nous contacter pour discuter de vos besoins spécifiques, nous sommes impatients de travailler avec vous pour réaliser votre vision numérique.
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
            <ContactForms/>
            <Footer/>
        </>
    );
}

export default About;