import React from "react";
import SideBar from "./incs/common/SideBar";
import NavBarBootstrap from "./incs/common/NavBarBootstrap";
import Footer from "./incs/common/Footer";
import {Howl} from "howler";
import ClicSound from "../assets/mp3/sound1.wav";
import ClicSound2 from "../assets/mp3/mixkit-arcade-rising-231.wav";
import Eclipse1 from "../assets/img/big-eclipse.svg";
import Eclipse2 from "../assets/img/mid-eclipse.svg";
import Eclipse3 from "../assets/img/small-eclipse.svg";
import {useState} from "react";
import Axios from "axios";



const Home = () => {
    // Fonction pour jouer le son
    const [email, setEmail] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false); // État pour contrôler la visibilité de l'alerte


    const playMusic = () => {
        const sound = new Howl({
            src: [ClicSound2],
            autoplay: true,
            mute: false,
        });
        sound.play();
    };

    const handleAlertClick = () => {
        // Masquer l'alerte lorsque l'utilisateur clique dessus
        setShowAlert(false);
    };

    const subscribe = () => {
        // Validation de l'adresse e-mail
        if (!email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
            setConfirmationMessage("Veuillez saisir une adresse e-mail valide.");
            setShowAlert(true, setTimeout(() => {
                setShowAlert(false);
            }, 3000));

            return;
        }

        Axios.get(
            `https://de-lafontaine.ca/mealplanner/public/api/subscribe?email=${email}`
        )
            .then((response) => {
                setConfirmationMessage("Souscription réussie, email de confirmation envoyé.");
                // Réinitialisez l'adresse e-mail après la soumission réussie
                setEmail("");
                setShowAlert(true, setTimeout(() => {
                    setShowAlert(false);
                }, 3000));
            })
            .catch((error) => {
                console.log(error.response);
                setConfirmationMessage("Une erreur s'est produite lors de la soumission.");
                setShowAlert(true, setTimeout(() => {
                    setShowAlert(false);
                }, 3000));
            });
    };



    return (
        <>
            <NavBarBootstrap pageTitle="De-Lafontaine"/>
            <section>
                <div className="container-spacer-20">
                </div>
            </section>


            <section>
                <div className="container-fluid m-1">
                    <div className="row">
                        <div className="col">
                            <div className="content">

                                <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                                <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                                <img className="small-circle" src={Eclipse3} alt="small-circle"/>


                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12 card col-special-radius super-background-quebec">
                                            <img className="super-logo" src={process.env.PUBLIC_URL + '/logo512.png'} alt="Logo React" />

                                            <h1 className="display-4 text-center mt-5 mb-2">Hello my Friend !</h1>
                                            <p className="lead ms-5">
                                                Eh bien, bien, bien, regardez qui est arrivé dans mon saloon numérique.
                                            </p>
                                            <p className="lead ms-2">
                                                Je m'appelle <strong>Rusty</strong>, et je ne suis pas seulement de la
                                                rouille, je suis aussi un cowboy du React. <br/>
                                                Ouais, c'est ma petite portion de la frontière numérique.
                                            </p>
                                            <hr className="text-light"/>
                                            <p className="lead ps-3 pe-4 text-light text-end ">
                                                Chez DevMaster, nous sommes les maîtres de la programmation et de l'informatique. Notre passion pour la technologie nous pousse à repousser les limites de l'innovation et à créer des solutions numériques exceptionnelles.

                                                Notre Mission
                                                Nous croyons en la puissance de la programmation pour transformer le monde. Notre mission est de concevoir des logiciels et des systèmes informatiques qui répondent aux besoins les plus complexes de nos clients. Que vous soyez une entreprise à la recherche de solutions informatiques sur mesure ou un individu ayant une idée novatrice, nous sommes là pour vous aider à concrétiser votre vision.

                                                Notre Expertise
                                                Avec une équipe d'experts en informatique chevronnés, nous sommes à la pointe de la technologie. Notre expertise couvre une gamme variée de domaines, notamment :

                                                Développement de logiciels: De la conception à la mise en œuvre, nous créons des logiciels robustes et évolutifs qui simplifient les opérations et stimulent la croissance.

                                                Développement Web: Nous concevons des sites web dynamiques et réactifs qui offrent une expérience utilisateur exceptionnelle.

                                                Sécurité informatique: Votre sécurité est notre priorité. Nous protégeons vos données et votre infrastructure contre les menaces en constante évolution.

                                                Analyse de données: Nous utilisons des outils avancés pour extraire des informations précieuses à partir de vos données, vous aidant ainsi à prendre des décisions éclairées.


                                            </p>

                                            <p>
                                                Notre Engagement envers l'Excellence
                                                Chez DevMaster, nous nous engageons à fournir des solutions de la plus haute qualité. Nous collaborons étroitement avec nos clients pour comprendre leurs besoins spécifiques et développer des solutions sur mesure qui les satisfont pleinement.
                                            </p>
                                            <p className="text-end me-5">
                                                Contactez-nous dès aujourd'hui pour discuter de la manière dont DevMaster peut vous aider à atteindre vos objectifs technologiques.
                                            </p>
                                            <p>
                                                Bienvenue chez DevMaster, où l'informatique devient un chef-d'œuvre.
                                            </p>



                                            <p className="lead text-end ms-5 mt-2">
                                                <button className="btn btn-warning border border-dark btn-lg" onClick={playMusic}>
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
            </section>

            <section>
                <div className="container-spacer-100">
                </div>
            </section>
            <section>
                <div className="container-fluid row-subscribe">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="input-group form-floating mb-2 ">
                                <input name="email" type="email" className="form-control input-subscribe" id="email"
                                       placeholder="Saisir votre émail"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)} required
                                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                                <label htmlFor="email" className="form-label label-subscribe">Email address</label>
                                <button className="btn btn-primary border-light" type="button" onClick={subscribe} id="button-addon2">Subscribe</button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Affichage de l'alerte Bootstrap */}
                        {showAlert && (
                            <div
                                className="alert alert-success alert-dismissible fade show col-4 mx-auto super-alert"
                                role="alert"
                                onClick={handleAlertClick} // Gestionnaire d'événements pour masquer l'alerte lors du clic
                            >
                                {confirmationMessage}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className="container-spacer-100">
                </div>
            </section>

            <Footer/>
        </>
    );
};

export default Home;
