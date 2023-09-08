import React from "react";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import SideBar from "../../incs/SideBar";

class PostRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            image: "",
            redirect: false,
            errors: [],
        };
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value }, () => {
            // console.log(this.state.title);
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value }, () => {
            // console.log(this.state.description);
        });
    };
    handleImageChange = (event) => {
        // console.log(event.target.files[0]);

        this.setState({ image: event.target.files[0] }, () => {
            // console.log(this.state.image);
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let bodyFormData = new FormData();
        bodyFormData.set("title", this.state.title);
        bodyFormData.set("description", this.state.description);
        bodyFormData.set("image", this.state.image);
        bodyFormData.set("user_id", localStorage.getItem("userId"));

        let headers = {
            headers: {
                "API-TOKEN ": localStorage.getItem("token"),
            },
        };

        Axios.post(
            "https://de-lafontaine.ca/mealplanner/public/api/add_picture",
            bodyFormData,
            headers
        )
            .then((response) => {
                this.setState({ redirect: true });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({ errors: error.response.data.errors }, () => {
                        console.log(this.state.errors);
                    });
                }
                console.log(error.response);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to="/album" />;
        }
        return (
            <>
                <NavBarBootstrap pageTitle="Add->Recipes" />
                <div className="container-fluid m-1">
                    <div className="row">
                        <div className="col-2 p-0 sidebar">
                            <SideBar />
                        </div>
                        <div className="col-md-10">
                            <div className="container">
                                <div className="row p-1">
                                    <div className="card mt-2 p-4 col-md-6 col-lg-8 col-sm-12 mx-auto">
                                        <h3>Ajouter une nouvelle Recette</h3>
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
                                                        this.state.errors && this.state.errors.title
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    id="title"
                                                    placeholder="Enter title"
                                                    onChange={this.handleTitleChange}
                                                />
                                                {this.state.errors && this.state.errors.title && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.title}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group mt-4">
                                                <label htmlFor="description">Description</label>
                                                <textarea
                                                    className={`form-control ${
                                                        this.state.errors && this.state.errors.description
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    id="description"
                                                    rows="6"
                                                    data-gramm="false"
                                                    wt-ignore-input="true"
                                                    onChange={this.handleDescriptionChange}
                                                ></textarea>
                                                {this.state.errors && this.state.errors.description && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.description}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label for="formFile" class="form-label">
                                                    Image
                                                </label>
                                                <input
                                                    onChange={this.handleImageChange}
                                                    className={`form-control ${
                                                        this.state.errors && this.state.errors.image
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    type="file"
                                                    id="formFile"
                                                />
                                                {this.state.errors && this.state.errors.image && (
                                                    <div className="invalid-feedback">
                                                        {this.state.errors.image}
                                                    </div>
                                                )}
                                            </div>

                                            <button type="submit" className="btn btn-primary mt-4">
                                                Ajouter
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PostRecipe;
