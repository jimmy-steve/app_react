import React from "react";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import SideBar from "../../incs/SideBar";
import Food1 from "../../../assets/img/food1.jpg";
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

                                <div className="row pt-1">


                                    <div className="col-md-12">
                                        <form id="recipeForm" action="" method="POST"
                                              encType="multipart/form-data">

                                            <div className="row g-0">
                                                <div className="col-sm-10 mx-auto col-md-5 position-relative"
                                                     >
                                                    <img id="img-recipe"
                                                         src={Food1}
                                                         className="card-img new__recipe__image img-fluid"
                                                         alt="recette"/>
                                                        <div className="form-group position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center new__recipe__image__file">
                                                            <div>
                                                                <label htmlFor="formFile"
                                                                       className="form-label text-light">Choisir votre
                                                                    image :</label>
                                                                <input className="form-control" type="file"
                                                                       id="picture_url" name="picture_url"/>
                                                            </div>
                                                        </div>
                                                </div>
                                                <div className="col-sm-10 col-md-6 m-2 card mx-auto">
                                                    <div className="card-body">
                                                        <div className="form-group mt-4">
                                                            <h2 className="ms-5 m-2 mb-5 recipe--title">
                                                                <input type="text" className="form-control" id="title"
                                                                       name="title"
                                                                       placeholder="Saisir le titre ..."/>
                                                            </h2>
                                                        </div>
                                                        <h6 className="ms-4 mt-4 text-end">
                                                            <div className="form-group row">
                                                                <label htmlFor="preparation_time"
                                                                       className="col-sm-9 col-form-label">Temps de
                                                                    préparation (en minutes)</label>
                                                                <div
                                                                    className="col-sm-2 col-md-2 rounded-pill bg-primary m-1">
                                                                    <input type="number" className="form-control"
                                                                           id="preparation_time"
                                                                           name="preparation_time"/>
                                                                </div>
                                                            </div>
                                                        </h6>
                                                        <h6 className="ms-4 mt-4 text-end">
                                                            <div className="form-group row">
                                                                <label htmlFor="cooking_time"
                                                                       className="col-sm-9 col-form-label">Temps de
                                                                    cuisson (en
                                                                    minutes)</label>
                                                                <div
                                                                    className="col-sm-2 col-md-2 rounded-pill bg-primary m-1">
                                                                    <input type="number" className="form-control"
                                                                           id="cooking_time"
                                                                           name="cooking_time"/>
                                                                </div>
                                                            </div>
                                                        </h6>
                                                        <h6 className="ms-4 mt-4 text-end">
                                                            <div className="form-group row">
                                                                <label htmlFor="servings"
                                                                       className="col-sm-9 col-form-label">Nombre de
                                                                    portions</label>
                                                                <div
                                                                    className="col-sm-2 col-md-2 rounded-pill bg-primary m-1">
                                                                    <input type="number" className="form-control"
                                                                           id="servings" name="servings"/>
                                                                </div>
                                                            </div>
                                                        </h6>
                                                        <h6 className="ms-4 mt-4 text-end">
                                                            <div className="form-group row">
                                                                <label htmlFor="source_url"
                                                                       className="col-sm-4 col-form-label">URL de la
                                                                    source</label>
                                                                <div className="col-sm-8 col-md-8">
                                                                    <input type="text" className="form-control"
                                                                           id="source_url" name="source_url"/>
                                                                </div>
                                                            </div>
                                                        </h6>

                                                        <h6 className="ms-4 mt-4 text-end">
                                                            <div className="form-group row">

                                                                <label htmlFor="note"
                                                                       className="col-sm-2 col-form-label">Note</label>
                                                                <div className="col-sm-10 col-md-10">
                                                                    <input type="text" className="form-control"
                                                                           id="note" name="note"/>
                                                                </div>

                                                            </div>
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="row mx-auto">
                                                    <div className="col-6 mt-3">
                                                        <div className="text-start h3 ">Instructions :</div>
                                                        <div className="card-text card" id="recipe-instructions">
                                                            <div className="form-group">
                                        <textarea id="instructions" className="form-control" rows="8"
                                                  name="instructions"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 mt-3">
                                                        <div className="text-start h3">Ingrédients :</div>
                                                        <div className="">
                                                            <table
                                                                className="table table-hover text-center table-primary table-bordered">
                                                                <thead className="border-bottom">
                                                                <tr>
                                                                    <th className="col-2">Quantité</th>
                                                                    <th className="col-2">Unité</th>
                                                                    <th scope="col">Nom</th>
                                                                    <th className="col-2">
                                                                        <button className="btn btn-sm btn-warning"
                                                                                id="add-ingredient-btnTest"><i
                                                                            className="fa fa-arrow-down"
                                                                            aria-hidden="true"></i></button>
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody id="recipe-ingredients">

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="ms-4 mt-4">
                                                            <input type="hidden" name="user_id" id="user_id" value="6"/>
                                                                <button type="submit"
                                                                        className="btn btn-primary mt-4">Ajouter
                                                                </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
