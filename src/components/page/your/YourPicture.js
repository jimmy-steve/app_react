import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLoader from "../../incs/AppLoader";
import SideBar from "../../incs/SideBar"; // Assurez-vous que le chemin du composant SideBar est correct
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import {Link} from "react-router-dom";
import FLogo from "../../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";

const YourPicture = () => {
    const [pictures, setPictures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (localStorage.getItem("token")) {
            axios.get(`https://de-lafontaine.ca/mealplanner/public/api/pictures-by-user`, headers)
                .then((response) => {
                    // Mettez à jour l'état pictures avec les données de l'API
                    console.log(response.data.pictures.data);
                    setPictures(response.data.pictures.data);
                    setTotalPages(response.data.pictures.last_page);
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
            <NavBarBootstrap pageTitle="this->Picture" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid mt-3">
                            {isLoading ? ( // Affichez l'indicateur de chargement si isLoading est vrai
                                <div className="d-flex justify-content-center mt-5">
                                    <AppLoader />
                                </div>
                            ) : (
                                <>
                                    {pictures.length === 0 ? ( // Vérifiez si la liste des pictures est vide
                                        <div className="alert alert-danger">
                                            Désolé, aucune picture trouvée.
                                        </div>
                                    ) : (
                                        <table className="table table-hover border border-dark">
                                            <thead>
                                            <tr className="table-dark">
                                                <th scope="col">ID</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {pictures.map((picture) => (
                                                <tr key={picture.id} className="table-active">
                                                    <th scope="row">{picture.id}</th>
                                                    <td>{picture.title}</td>
                                                    <td>
                                                        <i className="fa-solid fa-pen-to-square ms-1"></i>
                                                        <i className="fa-solid fa-delete-left ms-3"></i>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {/* Pagination */}
                                    <div className="pagination-container">
                                        <ul className="pagination">
                                            {Array.from({ length: totalPages }, (_, i) => (
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
                                        <Link to="/pictures/new">
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

export default YourPicture;
