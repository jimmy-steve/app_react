import React, {useState, useEffect} from "react";
import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import {Link} from "react-router-dom";
import Axios from "axios";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import dayjs from "dayjs";
import Footer from "../../incs/common/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const Recipe = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state for loading
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setSearch(inputValue); // Set search state with input value

            e.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée"
            // Vous pouvez ajouter ici une logique personnalisée pour gérer l'événement de la touche "Entrée"
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        this.getArticles(currentPage);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.set("search", search);

        const getRecipes = (page) => {
            Axios.post(
                `https://de-lafontaine.ca/mealplanner/public/api/recipes?page=${page}`,
                bodyFormData
            )
                .then((response) => {
                    setRecipes(response.data.data);
                    setTotalPages(response.data.last_page);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        getRecipes(currentPage); // Include currentPage here

    }, [search, currentPage]); // Add currentPage as a dependency



    return (
        <>
            <NavBarBootstrap pageTitle="Recettes"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                        <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                        <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                        {isLoading ? ( // Display loader while loading
                            <div className="d-flex justify-content-center mt-5">
                                <TriangleLoader/>
                            </div>
                        ) : (
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    <div className="container my-3">
                                        <div className="d-flex justify-content-center mb-5 mt-4">
                                            <form
                                                action="POST"
                                                className="form-inline my-2 my-lg-0"
                                                onSubmit={handleSubmit}
                                            >
                                                <input
                                                    className="form-control mr-sm-2 super-search-input"
                                                    type="search"
                                                    name="search"
                                                    placeholder="Search a recipe here ..."
                                                    onKeyDown={handleKeyPress}
                                                    onChange={handleSearchChange}
                                                />
                                            </form>
                                        </div>

                                        <div className="row justify-content-center mt-3">
                                            {recipes.map((recipe) => (
                                                <div
                                                    className="col-md-4 p-3 col-sm-12 col-lg-3"
                                                    key={recipe.id}
                                                >
                                                    <div className="col-picture-4">
                                                    <img
                                                        src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${recipe.picture_url}`}
                                                        className="img-fluid card"
                                                        alt="..."
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title ms-3 mt-1">{recipe.title}</h5>
                                                        <Link
                                                            to={`/recipes/${recipe.id}`}
                                                            className="btn btn-primary m-3"
                                                        >
                                                            En savoir plus
                                                        </Link>
                                                    </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>

                                        <div className="row justify-content-center mt-5 pagination-container">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination">
                                                    <li
                                                        className={`page-item ${
                                                            currentPage === 1 ? "disabled" : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(currentPage - 1)}
                                                        >
                                                            <i className="fa-solid fa-chevron-left"></i>
                                                        </button>
                                                    </li>
                                                    {Array.from({length: totalPages}, (_, i) => (
                                                        <li
                                                            className={`page-item ${
                                                                i + 1 === currentPage ? "active" : ""
                                                            }`}
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
                                                    <li
                                                        className={`page-item ${
                                                            currentPage === totalPages ? "disabled" : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(currentPage + 1)}
                                                        >
                                                            <i className="fa-solid fa-chevron-right"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Recipe;
