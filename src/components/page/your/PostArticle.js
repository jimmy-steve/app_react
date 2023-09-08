import React, { Component } from "react";
import axios from "axios";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import SideBar from "../../incs/SideBar";
import Axios from "axios";
import AppLoader from "../../incs/AppLoader";


class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
            image: "", // Ajout de l'attribut image dans le state
            content: "",
            status: false,
            user_id: 4, // Remplacez par l'ID de l'utilisateur connecté
            category_id: 2, // Remplacez par l'ID de la catégorie
            redirect: false,
            categories: [], // Un tableau pour stocker les catégories
            confirmationMessage: "",
            errors: [],
            isLoading: false, // Ajoutez un état pour le chargement initial
        };
    }



    componentDidMount() {
        // Effectuer la requête GET pour récupérer les catégories depuis l'API
        axios
            .get("https://de-lafontaine.ca/mealplanner/public/api/category")
            .then((response) => {
                // Mettre à jour l'état avec les catégories récupérées
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des catégories : ", error);
            });
    }

    // Les fonctions de gestion des changements d'entrée
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    handleSubtitleChange = (event) => {
        this.setState({ subtitle: event.target.value });
    };

    handleImageChange = (event) => {
        this.setState({ image: event.target.files[0] });
    };

    handleContentChange = (event) => {
        this.setState({ content: event.target.value });
    };


    handleStatusChange = (event) => {
        this.setState({ status: event.target.checked });
    };

    handleCategoryChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };




    handleSubmit = (event) => {
        this.setState({ isLoading: true });
        event.preventDefault();


        let bodyFormData = new FormData();
        bodyFormData.append("title", this.state.title);
        bodyFormData.append("subtitle", this.state.subtitle);
        bodyFormData.append("image", this.state.image);
        bodyFormData.append("content", this.state.content);
        bodyFormData.append("status", this.state.status);
        bodyFormData.append("category_id", this.state.category_id); // Utilisez cette ligne pour ajouter l'ID de la catégorie


        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        Axios.post(
            "https://de-lafontaine.ca/mealplanner/public/api/add_article",
            bodyFormData,
            headers
        )
            .then((response) => {
                this.setState({ isLoading: false });
                this.setState({ redirect: true });
                this.setState({ confirmationMessage: "Article ajouté avec succès" });

                // Réinitialisez les champs du formulaire après la soumission
                this.setState({
                    title: "",
                    subtitle: "",
                    image: "",
                    content: "",
                    status: false,
                    category_id: "", // Réinitialisez la catégorie si nécessaire
                });

                setTimeout(() => {
                    this.setState({ confirmationMessage: "" });


                }, 2000);

            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    this.setState({ errors: error.response.data.errors }, () => {
                        console.log(this.state.errors);
                    });
                }
                console.log(error.response);
            });
    };

    render() {
        return (
            <>
                <NavBarBootstrap pageTitle="Add Article" />
                <div className="container-fluid m-1">
                    <div className="row">
                        <div className="col-2 p-0 sidebar">
                            <SideBar />
                        </div>
                        <div className="col-md-10">

                            {this.state.confirmationMessage && (
                                <div className="alert alert-success mt-3">
                                    {this.state.confirmationMessage}
                                </div>
                            )}

                            {this.state.isLoading ? (
                                <div className="d-flex justify-content-center mt-5">
                                    <AppLoader />
                                </div>
                            ) : (
                            <div className="container">
                                <div className="row p-1">
                                    <div className="card mt-2 p-4 col-md-6 col-lg-8 col-sm-12 mx-auto">
                                        <h3>Ajouter un nouvel Article</h3>
                                        <form
                                            method="POST"
                                            onSubmit={this.handleSubmit}
                                            encType="multipart/form-data"
                                        >
                                            <div className="form-group mt-4">
                                                <label htmlFor="title">Titre</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        this.state.errors.title ? "is-invalid" : ""
                                                    }`}
                                                    id="title"
                                                    name="title"
                                                    placeholder="Entrez le titre"
                                                    value={this.state.title}
                                                    onChange={this.handleTitleChange}
                                                />
                                                {this.state.errors.title && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.title}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group mt-4">
                                                <label htmlFor="subtitle">Sous-titre</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        this.state.errors.subtitle ? "is-invalid" : ""
                                                    }`}
                                                    id="subtitle"
                                                    name="subtitle"
                                                    placeholder="Entrez le sous-titre"
                                                    value={this.state.subtitle}
                                                    onChange={this.handleSubtitleChange}
                                                />
                                                {this.state.errors.subtitle && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.subtitle}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="form-group mt-4">
                                                <label htmlFor="formFile" className="form-label">
                                                    Image
                                                </label>
                                                <input
                                                    name="image"
                                                    onChange={this.handleImageChange}
                                                    className={`form-control ${
                                                        this.state.errors.image ? "is-invalid" : ""
                                                    }`}
                                                    type="file"
                                                    id="formFile"
                                                />
                                                {this.state.errors.image && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.image}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="category" className="form-label mt-4">
                                                    Catégorie
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="category"
                                                    name="category_id"
                                                    value={this.state.category_id}
                                                    onChange={this.handleCategoryChange}
                                                >
                                                    <option value="">Sélectionnez une catégorie</option>
                                                    {this.state.categories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="form-group mt-4">
                                                <label htmlFor="content">Contenu</label>
                                                <textarea
                                                    className={`form-control ${
                                                        this.state.errors.content ? "is-invalid" : ""
                                                    }`}
                                                    id="content"
                                                    name="content"
                                                    rows="6"
                                                    placeholder="Entrez le contenu"
                                                    value={this.state.content}
                                                    onChange={this.handleContentChange}
                                                ></textarea>
                                                {this.state.errors.content && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.content}
                                                    </div>
                                                )}
                                            </div>


                                            <button
                                                type="submit"
                                                className="btn btn-primary mt-4"
                                                disabled={this.state.isSubmitting}
                                            >
                                                Ajouter
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AddArticle;
