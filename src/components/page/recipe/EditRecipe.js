import React from "react";
import Axios from "axios";
import {Navigate} from "react-router-dom";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import SideBar from "../../incs/common/SideBar";
import Food1 from "../../../assets/img/food1.jpg";
import axios from "axios";
import {Editor} from "@tinymce/tinymce-react";

class PostRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.state = {
            title: "",
            picture_url: "",
            source_url: "",
            instructions: "",
            servings: "",
            preparation_time: "",
            cooking_time: "",
            note: "",
            image: "",
            user_id: "",
            redirect: false,
            errors: [],
            recipeId: props.recipeId,
            ingredients: [],
        };
    }

    componentDidMount() {
        const recipeId = this.state.recipeId;

        if (recipeId) {
            axios
                .get(`https://de-lafontaine.ca/mealplanner/public/api/recipes/${recipeId}`)
                .then((response) => {
                    console.log(response.data);
                    this.setState({recipeData: response.data.recipe});
                    // Mettez à jour les champs du formulaire avec les données de de la recipe

                    // Extraction des ingrédients depuis la réponse de l'API
                    const ingredientsFromAPI = response.data.recipe.ingredients;

                    // Assignation des ingrédients à la propriété ingredients de l'état
                    this.setState({ ingredients: ingredientsFromAPI });

                    this.setState({
                        title: response.data.recipe.title,
                        description: response.data.recipe.description,
                        image: response.data.recipe.image,
                        picture_url: response.data.recipe.picture_url,
                        source_url: response.data.recipe.source_url,
                        instructions: response.data.recipe.instructions,
                        servings: response.data.recipe.servings,
                        preparation_time: response.data.recipe.preparation_time,
                        cooking_time: response.data.recipe.cooking_time,
                        note: response.data.recipe.note,

                    });
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération de la recipe: ", error);
                });
        }
    }
    handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...this.state.ingredients];
        updatedIngredients[index][field] = value;
        this.setState({ ingredients: updatedIngredients });
    };

    handleAddIngredient = () => {
        const newIngredient = { quantity: "", unit: "", name: "" };
        this.setState({ ingredients: [...this.state.ingredients, newIngredient] });
    };

    handleRemoveIngredient = (index) => {
        const updatedIngredients = [...this.state.ingredients];
        updatedIngredients.splice(index, 1);
        this.setState({ ingredients: updatedIngredients });
    };




    handleTitleChange = (event) => {
        this.setState({title: event.target.value}, () => {
            // console.log(this.state.title);
        });
    };

    handleImageChange = (event) => {
        // console.log(event.target.files[0]);

        this.setState({image: event.target.files[0]}, () => {
            // console.log(this.state.image);
        });
    };

    handleSourceUrlChange = (event) => {
        this.setState({source_url: event.target.value}, () => {
            // console.log(this.state.source_url);
        });
    }

    handleInstructionsChange = () => {
        if (this.editorRef.current) {
            // console.log(this.editorRef.current.getContent());
            this.setState({instructions: this.editorRef.current.getContent()});
        }
    }

    handleServingsChange = (event) => {
        this.setState({servings: event.target.value}, () => {
            // console.log(this.state.servings);
        });
    }

    handlePreparationTimeChange = (event) => {
        this.setState({preparation_time: event.target.value}, () => {
            // console.log(this.state.preparation_time);
        });
    }

    handleCookingTimeChange = (event) => {
        this.setState({cooking_time: event.target.value}, () => {
            // console.log(this.state.cooking_time);
        });
    }

    handleNoteChange = (event) => {
        this.setState({note: event.target.value}, () => {
            // console.log(this.state.note);
        });
    }

    picture_url = (event) => {
        this.setState({picture_url: event.target.value}, () => {
            // console.log(this.state.picture_url);
        });
    }


    handleSubmit = (event) => {
        event.preventDefault();

        let bodyFormData = new FormData();
        bodyFormData.set("title", this.state.title);
        bodyFormData.set("image", this.state.image);
        bodyFormData.set("source_url", this.state.source_url);
        bodyFormData.set("picture_url", 'test');
        bodyFormData.set("instructions", this.state.instructions);
        bodyFormData.set("servings", this.state.servings);
        bodyFormData.set("preparation_time", this.state.preparation_time);
        bodyFormData.set("cooking_time", this.state.cooking_time);
        bodyFormData.set("note", this.state.note);
        bodyFormData.set("user_id", localStorage.getItem("userId"));

        let headers = {
            headers: {
                "API-TOKEN ": localStorage.getItem("token"),
            },
        };

        Axios.post(
            "https://de-lafontaine.ca/mealplanner/public/api/edit_recipe",
            bodyFormData,
            headers
        )
            .then((response) => {
                console.log(response);
                this.setState({redirect: true});
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({errors: error.response.data.errors}, () => {
                        console.log(this.state.errors);
                    });
                }
                console.log(error.response);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to="/recipes"/>;
        }
        return (
            <>
                <NavBarBootstrap pageTitle="Add->Recipes"/>
                <div className="container-fluid m-1">
                    <div className="row">
                        <div className="col-2 p-0 sidebar">
                            <SideBar/>
                        </div>
                        <div className="col-md-10">

                            <div className="row pt-1">


                                <div className="col-md-12">
                                    <form id="recipeForm" onSubmit={this.handleSubmit} method="POST"
                                          encType="multipart/form-data">

                                        <div className="row g-0">
                                            <div className="col-sm-10 mx-auto col-md-5 position-relative"
                                            >
                                                <img id="img-recipe"
                                                     src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${this.state.picture_url}`}
                                                     className="card-img new__recipe__image img-fluid"
                                                     alt="recette"/>
                                                <div
                                                    className="form-group position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center new__recipe__image__file">
                                                    <div>
                                                        <label htmlFor="formFile"
                                                               className="form-label text-light">Choisir votre
                                                            image :</label>
                                                        <input className="form-control" type="file"
                                                               onChange={this.handleImageChange}
                                                               id="picture_url" name="picture_url"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-10 col-md-6 card mx-auto">
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <h2 className="ms-5 recipe--title">
                                                            <input type="text" className="form-control" id="title"
                                                                   name="title"
                                                                   value={this.state.title}
                                                                   onChange={this.handleTitleChange}
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
                                                                       value={this.state.preparation_time}
                                                                       onChange={this.handlePreparationTimeChange}
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
                                                                       value={this.state.cooking_time}
                                                                       onChange={this.handleCookingTimeChange}
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
                                                                       value={this.state.servings}
                                                                       onChange={this.handleServingsChange}
                                                                       id="servings" name="servings"/>
                                                            </div>
                                                        </div>
                                                    </h6>
                                                    <h6 className="ms-4 mt-4 text-end">
                                                        <div className="form-group row">
                                                            <label htmlFor="source_url"
                                                                   className="col-sm-4 col-form-label">URL</label>
                                                            <div className="col-sm-8 col-md-8">
                                                                <input type="text" className="form-control"
                                                                       value={this.state.source_url}
                                                                       onChange={this.handleSourceUrlChange}
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
                                                                       value={this.state.note}
                                                                       onChange={this.handleNoteChange}
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
                                                            <Editor
                                                                className={`form-control ${this.state.errors.content ? "is-invalid" : ""}`}
                                                                id="content"
                                                                name="content"
                                                                onEditorChange={this.handleInstructionsChange}
                                                                onInit={(evt, editor) => (this.editorRef.current = editor)}
                                                                initialValue={this.state.instructions}
                                                                init={{
                                                                    height: 300,
                                                                    menubar: false,
                                                                    plugins: 'anchor autolink charmap emoticons image link lists media searchreplace table visualblocks wordcount',
                                                                    toolbar:
                                                                        "undo redo | formatselect | " +
                                                                        "bold italic backcolor | alignleft aligncenter " +
                                                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                                                        "removeformat | help",
                                                                    content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-6 mt-3">
                                                    <div className="text-start h3">Ingrédients :</div>
                                                    <div className="">
                                                        <table
                                                            className="table text-center table-striped">
                                                            <thead className="border-bottom border-top border-start border-end">
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
                                                            {this.state.ingredients.map((ingredient, index) => (
                                                                <tr key={index} className="border-start border-end">
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={ingredient.quantity}
                                                                            onChange={(e) => this.handleIngredientChange(index, "quantity", e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={ingredient.unit}
                                                                            onChange={(e) => this.handleIngredientChange(index, "unit", e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={ingredient.name}
                                                                            onChange={(e) => this.handleIngredientChange(index, "name", e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-sm btn-danger"
                                                                            onClick={() => this.handleRemoveIngredient(index)}
                                                                        >
                                                                            Supprimer
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="ms-4 mt-4">
                                                        <input type="hidden" name="user_id" id="user_id" value="6"/>
                                                        <button type="submit"
                                                                className="btn btn-primary mt-4">Modifier
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
