import React from "react";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import SideBar from "../../incs/common/SideBar";
import Footer from "../../incs/common/Footer";
import axios from "axios";
import {useState} from "react";

const ContactForm = () => {

    // Créez un état local pour suivre les données du formulaire
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        telephone: "",
        email: "",
        message: "",
    });

    // Fonction de gestionnaire de changement pour mettre à jour l'état local lorsque les champs sont modifiés
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
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


                            <form method="POST" className="needs-validation"
                                  action="https://de-lafontaine.ca/contact_form_traitement.php">
                                <div className="row">
                                    <h3 className="text-center">Contact Form</h3>
                                    <div className="form-group col-md-6 has-validation form-floating mb-2">
                                        <input name="prenom" type="text" className="form-control" id="prenom"
                                               placeholder="Saisir votre prénom" required minLength="3"/>
                                        <label htmlFor="prenom" className="form-label">Prénom</label>
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid firstname.
                                    </div>
                                    <div className="form-group col-md-6 has-validation form-floating mb-2">
                                        <input name="nom" type="text" className="form-control" id="nom"
                                               placeholder="Saisir votre nom"
                                               required minLength="3"/>
                                        <label htmlFor="nom" className="form-label">Nom</label>
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid lastname.
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6 has-validation form-floating mb-2">
                                        <input name="telephone" type="text" className="form-control" id="telephone"
                                               placeholder="Saisir votre telephone"/>
                                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid phone number.
                                    </div>
                                    <div className="form-group col-md-6 has-validation form-floating mb-2">
                                        <input name="email" type="email" className="form-control" id="email"
                                               placeholder="Saisir votre émail" required
                                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                                        <label htmlFor="email" className="form-label">Email address</label>
                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid email.
                                    </div>
                                </div>
                                <div className="form-group has-validation form-floating mb-2">
                    <textarea name="message" className="form-control" id="message" rows="8" data-gramm="false"
                              wt-ignore-input="true" required minLength="3"></textarea>
                                    <label htmlFor="message" className="form-label">Message</label>
                                </div>
                                <div className="invalid-feedback">
                                    Please provide a valid messsage
                                </div>
                                <div className="form-group">
                                    <input name="submit" type="submit" className="btn btn-primary m-2"
                                           value="Envoyer"></input>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );

}

export default ContactForm;