import React, { useState, useEffect } from "react";
import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import AppLoader from "../../incs/loader/AppLoader";
import Footer from "../../incs/common/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const Album = () => {
    const [search, setSearch] = useState("");
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // Vous pouvez ajouter ici une logique personnalisée pour gérer l'événement de la touche "Entrée"
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Réinitialisez currentPage à 1 lorsque vous effectuez une nouvelle recherche
        setCurrentPage(1);
    };

    useEffect(() => {
        const getArticles = () => {
            let bodyFormData = new FormData();
            bodyFormData.set("search", search);

            Axios.post(
                `https://de-lafontaine.ca/mealplanner/public/api/most-recent-pictures?page=${currentPage}`,
                bodyFormData
            )
                .then((response) => {
                    console.log(response.data.last_page);
                    setPictures(response.data.data);
                    setTotalPages(response.data.last_page);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        getArticles(); // Appelez getArticles sans l'argument currentPage ici

    }, [search, currentPage]);

    return (
        <>
            <NavBarBootstrap pageTitle="Super Album" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-8 col-lg-10">
                        <div className="content">
                            <img className="big-circle" src={Eclipse1} alt="{Eclipse1}" />
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle" />
                            <img className="small-circle" src={Eclipse3} alt="small-circle" />

                            {isLoading ? (
                                <div className="d-flex justify-content-center mt-5">
                                    <AppLoader />
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
                                                        placeholder="Search a picture here ..."
                                                        onKeyDown={handleKeyPress}
                                                        onChange={handleSearchChange}
                                                    />
                                                </form>
                                            </div>

                                            <div className="row justify-content-center mt-3">
                                                {pictures.map((picture) => (
                                                    <div
                                                        className="col-3 mx-5 mb-2 col-album-2 mt-3"
                                                        key={picture.id}
                                                    >
                                                        <img
                                                            src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${picture.image}`}
                                                            className="card-img-top mt-2"
                                                            alt="..."
                                                        />
                                                        <div className="card-body">
                                                            <h3 className="card-title text-center mt-2">{picture.title}</h3>
                                                            <Link
                                                                to={`/pictures/${picture.id}`}
                                                                className="btn btn-primary m-2"
                                                            >
                                                                Dive in
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="row justify-content-center mt-3 pagination-container">
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
                                                                Précédent
                                                            </button>
                                                        </li>
                                                        {Array.from({ length: totalPages }, (_, i) => (
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
                                                                Suivant
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
            </div>
            <Footer />
        </>
    );
};

export default Album;
