import React, {useState, useEffect} from "react";
import axios from "axios";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import {Link} from "react-router-dom";
import DeleteModal from "../../incs/modal/DeleteModal";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const YourRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [redirect, setRedirect] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [recipeId, setRecipeToDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setShowDeleteModal(true);
        setRecipeToDeleteId(id);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "d MMMM yyyy", { locale: fr }); // Utilisez le locale "fr" pour le français
    };

    const handleDeleteConfirm = () => {
        destroyRecipe(recipeId);
        setShowDeleteModal(false);
    };

    const handleModalClose = () => {
        setShowDeleteModal(false);
    };

    const destroyRecipe = (recipeId) => {
        axios.delete(`https://de-lafontaine.ca/mealplanner/public/api/recipes/${recipeId}`)
            .then(() => {

                // Supprimez l'article de la liste locale
                const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
                setRecipes(updatedRecipes);

                // Mettez à jour le message de confirmation
                setConfirmationMessage("La Recipe a été supprimé avec succès.");

                // Supprimez le message de confirmation après 3 secondes
                setTimeout(() => {
                    setConfirmationMessage("");

                }, 3000);

            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la recipe : ", error);

            });
    }

    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (localStorage.getItem("token")) {
            axios.get(`https://de-lafontaine.ca/mealplanner/public/api/recipes-by-user?page=${currentPage}`, headers)
                .then((response) => {
                    setRecipes(response.data.recipes.data);
                    setTotalPages(response.data.recipes.last_page);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des pictures:", error);
                })
                .finally(() => {
                    setIsLoading(false); // Mettez à jour isLoading une fois la requête terminée
                });
        } else {
            setRedirect(true);
        }
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <NavBarBootstrap pageTitle="this>-Recipe"/>
            <div className="container-fluid m-1">
                <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid mt-3">
                            {isLoading ? ( // Affichez l'indicateur de chargement si isLoading est vrai
                                <div className="d-flex justify-content-center mt-5">
                                    <TriangleLoader/>
                                </div>
                            ) : (
                                <>
                                    {recipes.length === 0 ? ( // Vérifiez si la liste des pictures est vide
                                        <div className="alert alert-danger">
                                            Désolé, aucune recettes trouvée.
                                        </div>
                                    ) : (
                                        <table className="table table-hover border border-dark">
                                            <thead>
                                            <tr className="table-dark">
                                                <th scope="col">ID</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Servings</th>
                                                <th scope="col">Preparation Time</th>
                                                <th scope="col">Cooking Time</th>
                                                <th scope="col">Date Création</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recipes.map((recipe) => (
                                                <tr key={recipe.id} className="table-active">
                                                    <th scope="row">{recipe.id}</th>
                                                    <td className="text-center">
                                                        <img
                                                            src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${recipe.picture_url}`}
                                                            className="img-fluid img__table"
                                                            alt="Thumbnail de l'image"/>
                                                    </td>
                                                    <td>{recipe.title}</td>
                                                    <td>{recipe.servings}</td>
                                                    <td>{recipe.preparation_time}</td>
                                                    <td>{recipe.cooking_time}</td>
                                                    <td>{formatDate(recipe.created_at)}</td>
                                                    <td className="text-end">
                                                        <Link to={`/recipes/${recipe.id}`}>
                                                            <i className="fa-solid fa-code ms-1 btn btn-sm btn-outline-dark"></i>
                                                        </Link>
                                                        <Link to={`/recipes/edit/${recipe.id}`}>
                                                            <i className="fa-solid fa-pen-to-square ms-1 btn btn-sm btn-outline-warning"></i>
                                                        </Link>
                                                        <i
                                                            className="fa-solid fa-delete-left ms-1 btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteClick(recipe.id)}
                                                        ></i>
                                                        <DeleteModal
                                                            show={showDeleteModal}
                                                            onHide={handleModalClose}
                                                            onDelete={handleDeleteConfirm}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {/* Pagination */}
                                    <div className="pagination-container">
                                        <ul className="pagination">
                                            {Array.from({length: totalPages}, (_, i) => (
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
                                        </ul>
                                    </div>

                                    <div className="add-btn-container bg-success">
                                        <Link to="/recipes/new">
                                            <i className="fa-solid fa-square-plus"></i>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourRecipe;
