import React from "react";

const ContactForms = () => {
            return (
                <>
                    <section>
                        <div className="container-fluid row-contact-form">
                            <div className="row">
                                <div className="col-md-8 mx-auto mb-4 mt-4">
                                    <h2 className="text-center mb-3 text-light mt-3">Send question and everythings else ?</h2>
                                    <form method="POST" className="needs-validation home-contact-form"
                                          action="#">
                                        <div className="row">
                                            <div className="form-group col-md-6 has-validation form-floating mb-2">
                                                <input name="prenom" type="text" className="form-control back-transparent" id="prenom"
                                                       placeholder="Saisir votre prénom" required minLength="3"/>
                                                <label htmlFor="prenom" className="form-label ms-2">Prénom</label>
                                            </div>
                                            <div className="invalid-feedback">
                                                Please provide a valid firstname.
                                            </div>
                                            <div className="form-group col-md-6 has-validation form-floating mb-2">
                                                <input name="nom" type="text" className="form-control back-transparent" id="nom"
                                                       placeholder="Saisir votre nom"
                                                       required minLength="3"/>
                                                <label htmlFor="nom" className="form-label ms-2">Nom</label>
                                            </div>
                                            <div className="invalid-feedback">
                                                Please provide a valid lastname.
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6 has-validation form-floating mb-2">
                                                <input name="telephone" type="text" className="form-control back-transparent" id="telephone"
                                                       placeholder="Saisir votre telephone"/>
                                                <label htmlFor="telephone" className="form-label ms-2">Téléphone</label>
                                            </div>
                                            <div className="invalid-feedback">
                                                Please provide a valid phone number.
                                            </div>
                                            <div className="form-group col-md-6 has-validation form-floating mb-2">
                                                <input name="email" type="email" className="form-control back-transparent" id="email"
                                                       placeholder="Saisir votre émail" required
                                                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                                                <label htmlFor="email" className="form-label ms-2">Email address</label>
                                            </div>
                                            <div className="invalid-feedback">
                                                Please provide a valid email.
                                            </div>
                                        </div>
                                        <div className="form-group has-validation form-floating mb-2">
                                    <textarea name="message" className="form-control back-transparent" id="message" rows="4" data-gramm="false"
                                              required minLength="3"></textarea>
                                            <label htmlFor="message" className="form-label">Message</label>
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a valid messsage
                                        </div>
                                        <div className="form-group text-end">
                                            <input name="submit" type="submit" className="btn btn-secondary m-2"
                                                   value="Envoyer"></input>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </section>
                    </>
            );
}

export default ContactForms;