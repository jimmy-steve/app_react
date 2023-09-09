import React, {useState, useEffect} from "react";
import SideBar from "../../incs/SideBar";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import {Link} from "react-router-dom";
import Axios from "axios";
import AppLoader from "../../incs/AppLoader";
import dayjs from "dayjs";
import Footer from "../../incs/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const Recipe = () => {
    const [selectedDate, setSelectedDate] = React.useState(dayjs());

    const handlePrevWeek = () => {
        setSelectedDate(selectedDate.subtract(1, "week"));
    };

    const handleNextWeek = () => {
        setSelectedDate(selectedDate.add(1, "week"));
    };


    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state for loading
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {

            e.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée"
            // Vous pouvez ajouter ici une logique personnalisée pour gérer l'événement de la touche "Entrée"
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        this.getArticles();
    };

    useEffect(() => {
        // Load articles on component mount

        const getRecipes = () => {
            let bodyFormData = new FormData();
            bodyFormData.set("search", search);

            Axios.post(
                "https://de-lafontaine.ca/mealplanner/public/api/recipes",
                bodyFormData
            )
                .then((response) => {
                    setRecipes(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                .finally(() => {
                    setIsLoading(false); // Set loading to false after request completes
                });
        };

        getRecipes();
    }, [search]);


    return (
        <>
            <NavBarBootstrap pageTitle="Recettes"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-8 col-lg-10">
                        <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                        <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                        <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                        {isLoading ? ( // Display loader while loading
                            <div className="d-flex justify-content-center mt-5">
                                <AppLoader/>
                            </div>
                        ) : (
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    <div className="container my-3">
                                        <div className="d-flex justify-content-center mb-4 mt-4">
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
                                                    className="card mx-2 mb-2"
                                                    key={recipe.id}
                                                    style={{width: "320px"}}
                                                >
                                                    <img
                                                        src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${recipe.picture_url}`}
                                                        className="card-img-top mt-2 rounded"
                                                        alt="..."
                                                        style={{width: "285px", height: "250px"}}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{recipe.title}</h5>
                                                        <Link
                                                            to={`/recipes/${recipe.id}`}
                                                            className="btn btn-primary"
                                                        >
                                                            En savoir plus
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}


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
