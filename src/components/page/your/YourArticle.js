import React, {useState, useEffect} from "react";
import axios from "axios";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import {Link} from "react-router-dom";
import DeleteModal from "../../incs/modal/DeleteModal";
import { format } from "date-fns";
import {fr} from "date-fns/locale";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";



const YourArticle = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [articleToDeleteId, setArticleToDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "d MMMM yyyy", { locale: fr }); // Utilisez le locale "fr" pour le français
    };

    const handleDeleteConfirm = () => {
        // Ici, vous pouvez mettre votre logique de suppression
        destroyArticle(articleToDeleteId);
        // Après la suppression, vous pouvez fermer le modal en utilisant setShowDeleteModal(false)
        setShowDeleteModal(false);
    };

    const destroyArticle = (articleId) => {
        axios.delete(`https://de-lafontaine.ca/mealplanner/public/api/articles/${articleId}`)
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


    const handleModalClose = () => {
        setShowDeleteModal(false);
    };


    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (localStorage.getItem("token")) {
            axios
                .get(`https://de-lafontaine.ca/mealplanner/public/api/articles-by-user?page=${currentPage}`, headers)
                .then((response) => {
                    console.log(response.data.articles.data);
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
        // Affichez le modal de confirmation de suppression
        setShowDeleteModal(true);
        // Stockez l'ID de l'article à supprimer dans un état local
        setArticleToDeleteId(articleId);
    };

    return (
        <>
            <NavBarBootstrap pageTitle="this->Article"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">

                        <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                        <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                        <img className="small-circle" src={Eclipse3} alt="small-circle"/>


                        {confirmationMessage && (
                            <div className="alert alert-success mt-3">
                                {confirmationMessage}
                            </div>
                        )}
                        <div className="container-fluid mt-3">
                            {isLoading ? (
                                <div className="d-flex justify-content-center mt-5">
                                    <TriangleLoader/>
                                </div>
                            ) : (
                                <>
                                    {articles.length === 0 ? (
                                        <div className="alert alert-warning">
                                            Désolé, aucune article trouvé.
                                        </div>
                                    ) : (
                                        <div className="col-12 mx-auto">
                                            <table className="table table-hover border border-dark">
                                                <thead>
                                                <tr className="table-dark">
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Title</th>
                                                    <th className="max-width-table" scope="col">SubTitle</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Date Création</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                {articles.map((article) => (
                                                    <tr key={article.id} className="table-active">
                                                        <th scope="row">{article.id}</th>
                                                        <td className="text-center">
                                                            <img
                                                                src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${article.image}`}
                                                                className="img-fluid img__table"
                                                                alt="Thumbnail de l'image"/>
                                                        </td>
                                                        <td className="max-width-table">{article.title}</td>
                                                        <td className="max-width-table">{article.subtitle}</td>
                                                        <td>{article.status === "1" ? "Active" : "Inactive"}</td>
                                                        <td>{formatDate(article.created_at)}</td>
                                                        <td className="text-end">
                                                            <Link to={`/blog/${article.id}`}>
                                                                <i className="fa-solid fa-code ms-1 btn btn-sm btn-outline-dark"></i>
                                                            </Link>
                                                            <Link to={`/blog/edit/${article.id}`}>
                                                                <i className="fa-solid fa-pen-to-square ms-1 btn btn-sm btn-outline-warning"></i>
                                                            </Link>
                                                            <i
                                                                className="fa-solid fa-delete-left ms-1 btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDeleteArticle(article.id)}
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
                                        </div>
                                    )}

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
