import React from "react";
import NavBarBootstrap from "./incs/common/NavBarBootstrap";
import Footer from "./incs/common/Footer";
import {Howl} from "howler";
import ClicSound2 from "../assets/mp3/mixkit-arcade-rising-231.wav";
import Eclipse1 from "../assets/img/big-eclipse.svg";
import Eclipse2 from "../assets/img/mid-eclipse.svg";
import Eclipse3 from "../assets/img/small-eclipse.svg";
import {useState} from "react";
import Axios from "axios";
import {useEffect} from "react";
import TriangleLoader from "./incs/loader/TriangleLoader";
import {Link} from "react-router-dom";


const Home = () => {
    // Fonction pour jouer le son
    const [email, setEmail] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false); // État pour contrôler la visibilité de l'alerte
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        const getArticles = (page) => {
            Axios.get(`https://de-lafontaine.ca/mealplanner/public/api/articles/recent-max-four?page=${page}`)
                .then((response) => {
                    setArticles(response.data.data);
                    setTotalPages(response.data.last_page);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        getArticles(currentPage); // Load articles for the initial page
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


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


            <section className="overview-wrap" id="overview">
                <div className="container">
                    <div className="contenedor">
                        <h2 className="title-overview wow fadeInUp">! DevMaster !</h2>
                        <h5 className="text-center">Nous croyons en la puissance de la programmation pour transformer le monde. </h5>
                        <p className="subtitle-overview wow fadeInUp">
                            Notre mission est de concevoir des logiciels et des systèmes informatiques qui répondent aux besoins les plus complexes de nos clients. Que vous soyez une entreprise à la recherche de solutions informatiques sur mesure ou un individu ayant une idée novatrice, nous sommes là pour vous aider à concrétiser votre vision.
                        </p>
                        <div className="row">
                            <div className="col-md-6 col-lg-3">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="android fa-brands fa-java fa-5x m-auto"></i>
                                    </div>
                                    <h5>Java</h5>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa-brands fa-php fa-5x html5 m-auto"></i>
                                    </div>
                                    <h5>PHP</h5>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa-brands fa-square-js fa-5x css3 m-auto"></i>
                                    </div>
                                    <h5>Javascript</h5>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa-brands fa-react fa-5x css3 m-auto"></i>
                                    </div>
                                    <h5>React</h5>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-duration="1.4s">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa fa-html5 fa-5x html5 m-auto"></i>
                                    </div>
                                    <h5>Html 5</h5>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-duration="1.4s">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa fa-css3 fa-5x css3 m-auto"></i>
                                    </div>
                                    <h5>CSS 3</h5>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-duration="1.4s">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa fa-android fa-5x android m-auto"></i>
                                    </div>
                                    <h5>Android</h5>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-duration="1.4s">
                                <div className="overview-box mx-auto">
                                    <div className="features-icons-icon d-flex">
                                        <i className="fa-brands fa-wordpress fa-5x drupal m-auto"></i>
                                    </div>
                                    <h5>Wordpress</h5>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section className="galeria">
                <div className="sesgoarriba"></div>
                <div className="imagenes">
                    <img
                        src="https://images.pexels.com/photos/938965/pexels-photo-938965.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                        alt="" className="img-fluid"/>
                        <div className="enmica">
                            <h2>DevMaster's Design</h2>
                            <div></div>
                        </div>
                </div>

                <div className="sesgoabajo"></div>
            </section>
            <section className="our-team" id="team">
                <div className="container">
                    <h2 className="title-our-team wow fadeInUp">Our Lastest Post</h2>
                    <p className="subtitle-our-team wow fadeInUp">Lorem ipsum dolor sit amet consectetur adipiscing elit
                        proin leo leo ornare nec vulputate tempus velit nam id purus tellus hendrerit mi dapibus</p>

                    <ul className="row">
                        {isLoading ? (
                            <div className="d-flex justify-content-center mt-5">
                                <TriangleLoader/>
                            </div>
                        ) : (
                            <>
                                <div className="row g-4">
                                    <div className="container my-3">
                                        <div className=" ms-3 row justify-content-center">
                                            {articles.map((article) => (
                                                <li key={article.id} className="col-12 col-md-6 col-lg-3">
                                                    <div className="mycard-block equal-hight">
                                                        <figure><img
                                                            src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${article.image}`}
                                                            className="img-fluid" alt=""/></figure>
                                                        <h3><a href="">{article.title}</a></h3>
                                                        <p>{article.subtitle}</p>
                                                        <ul className="follow-us clearfix">
                                                            <li>
                                                                <Link
                                                                    className="btn btn-circle my-social-btn google"
                                                                    to={`/blog/${article.id}`}
                                                                >
                                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                                </Link>
                                                            </li>
                                                            <li><a className="btn btn-circle my-social-btn fb"><i
                                                                className="fa fa-facebook "></i></a></li>
                                                            <li><a className="btn btn-circle my-social-btn twitter"><i
                                                                className="fa fa-twitter "></i></a></li>
                                                            {/*<li><a href="#" className="btn btn-circle my-social-btn google"><i*/}
                                                            {/*    className="fa fa-linkedin "></i></a></li>*/}
                                                        </ul>
                                                    </div>
                                                </li>
                                            ))}
                                        </div>

                                        <div className="row justify-content-center mt-3 pagination-container">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination">
                                                    {currentPage > 0 && ( // Conditionally render the Previous button
                                                        <li className={`page-item`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() => handlePageChange(currentPage - 1)}
                                                            >
                                                                <i className="fa-solid fa-chevron-left"></i>
                                                            </button>
                                                        </li>
                                                    )}
                                                    {Array.from({ length: totalPages }, (_, i) => (
                                                        <li
                                                            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                                            key={i}
                                                        >
                                                            <button
                                                                className="page-link"
                                                                onClick={() => handlePageChange(i + 1)}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    {currentPage <= totalPages && ( // Conditionally render the Next button
                                                        <li className={`page-item`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() => handlePageChange(currentPage + 1)}
                                                            >
                                                                <i className="fa-solid fa-chevron-right"></i>
                                                            </button>
                                                        </li>
                                                    )}
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}




                    </ul>
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
