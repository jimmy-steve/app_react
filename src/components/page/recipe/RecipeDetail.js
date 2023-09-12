import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import Axios from "axios";
import {useParams} from "react-router-dom";
import AppLoader from "../../incs/loader/AppLoader";
import FavoriteBorderButton from "@material-ui/icons/FavoriteBorder";
import FavoriteButton from "@material-ui/icons/Favorite";
import {Link} from "react-router-dom";

const RecipeDetail = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (isNaN(id)) {
            setRedirect(true);
            return;
        }

        if (localStorage.getItem("token")) {
            Axios.get(
                `https://de-lafontaine.ca/mealplanner/public/api/recipes/${id}`,
                headers
            )
                .then((response) => {
                    setRecipe(response.data.recipe);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error.response);
                    setIsLoading(false);
                });

        } else {
            setRedirect(true);
        }
    }, [id]);

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <NavBarBootstrap/>
            <div className="recipe container my-4">
                {isLoading ? ( // Affichez le loader tant que les données sont en cours de chargement
                    <div className="d-flex justify-content-center mt-5">
                        <AppLoader />
                    </div>
                ) : (
                    <div className="row g-0">
                        <div className="col-sm-12 col-md-6">
                            <img id="img-recipe"
                                 src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${recipe.picture_url}`}
                                 className=" card-img" alt="recette"/>

                        </div>


                        <div className="col-sm-12 col-md-6">
                            <div className="card-body">
                                <h1 className="ms-5 recipe--title">{recipe.title}</h1>
                                <div className="jaime-btn">
                                    <FavoriteButton
                                        className="text-danger"
                                    /> J'aime
                                </div>
                                <h6 className="ms-4 text-end">
                                    Temps de préparation :
                                    <span className="badge bg-warning me-4 ms-2"
                                          id="recipe-preparation-time">{recipe.preparation_time} min</span>
                                </h6>
                                <h6 className="ms-4 text-end">
                                    Temps de cuisson :
                                    <span className="badge bg-warning me-4 ms-2"
                                          id="recipe-cooking-time">{recipe.cooking_time} min</span>
                                </h6>
                                <h6 className="ms-4 text-end">
                                    Nombre de portions :
                                    <span className="badge bg-warning me-4 ms-2"
                                          id="recipe-servings">{recipe.servings}</span>
                                </h6>

                                <div className="ms-5 h3">Ingrédients :</div>
                                <div className="col-lg-10 col-md-12 mx-auto">
                                    <table className="table table-hover text-center table-light">
                                        <thead className="border-bottom">
                                        <tr>
                                            <th scope="col">Quantité</th>
                                            <th scope="col">Unité</th>
                                            <th scope="col">Nom</th>
                                        </tr>
                                        </thead>
                                        <tbody id="recipe-ingredients">

                                        {recipe.ingredients.map((ingredient) => (
                                            <tr key={ingredient.id}>
                                                <th scope="row">{ingredient.quantity}</th>
                                                <td>{ingredient.unit}</td>
                                                <td>{ingredient.name}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row mx-auto ms-1">
                            <div className="col--md-6 col-sm-12 m-1">
                                <div className="text-start"><span className="h3">Instructions :</span></div>
                                <div className="card-text card" id="recipe-instructions">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                                    ></div>
                                </div>
                            </div>

                            <div className="text-end mt-4">
                                <Link to="/recipes" className="btn btn-primary">
                                    <i className="fa-solid fa-arrow-left"></i> Retour
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RecipeDetail;
