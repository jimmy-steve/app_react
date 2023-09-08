import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLoader from "../../incs/AppLoader";
import SideBar from "../../incs/SideBar";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import { Link } from "react-router-dom";

const YourArticle = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (localStorage.getItem("token")) {
            axios
                .get(`https://de-lafontaine.ca/mealplanner/public/api/articles-by-user`, headers)
                .then((response) => {
                    setArticles(response.data.articles.data);
                    setTotalPages(response.data.articles.last_page);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des articles:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setRedirect(true);
        }
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteArticle = (articleId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            axios
                .delete(`https://de-lafontaine.ca/mealplanner/public/api/articles/${articleId}`)
                .then(() => {
                    // Supprimez l'article de la liste locale
                    const updatedArticles = articles.filter((article) => article.id !== articleId);
                    setArticles(updatedArticles);

                    // Mettez à jour le message de confirmation
                    setConfirmationMessage("L'article a été supprimé avec succès.");

                    // Supprimez le message de confirmation après 3 secondes
                    setTimeout(() => {
                        setConfirmationMessage("");

                    }, 3000);


                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression de l'article : ", error);
                });
        }
    };

    return (
        <>
            <NavBarBootstrap pageTitle="this->Article" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-10">

                        {confirmationMessage && (
                            <div className="alert alert-success mt-3">
                                {confirmationMessage}
                            </div>
                        )}
                        <div className="container-fluid mt-3">
                            {isLoading ? (
                                <div className="d-flex justify-content-center mt-5">
                                    <AppLoader />
                                </div>
                            ) : (
                                <>
                                    {articles.length === 0 ? (
                                        <div className="alert alert-warning">
                                            Désolé, aucune article trouvé.
                                        </div>
                                    ) : (
                                        <div className="col-8 mx-auto">
                                        <table className="table table-hover border border-dark">
                                            <thead>
                                            <tr className="table-dark">
                                                <th scope="col">ID</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">SubTitle</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {articles.map((article) => (
                                                <tr key={article.id} className="table-active">
                                                    <th scope="row">{article.id}</th>
                                                    <td>{article.title}</td>
                                                    <td>{article.subtitle}</td>
                                                    <td>{article.status === "1" ? "Active" : "Inactive"}</td>
                                                    <td className="text-end">
                                                        <i className="fa-solid fa-pen-to-square ms-1"></i>

                                                        <i
                                                            className="fa-solid fa-delete-left ms-3 btn btn-sm"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleDeleteArticle(article.id)}
                                                        ></i>
                                                    </td>

                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                            </div>
                                    )}

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
                                        <Link to="/blog/new">
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

export default YourArticle;
