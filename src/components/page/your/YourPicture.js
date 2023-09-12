import React, {useState, useEffect} from "react";
import axios from "axios";
import BallTriangleLoader from "../../incs/loader/BallTriangleLoader";
import SideBar from "../../incs/common/SideBar"; // Assurez-vous que le chemin du composant SideBar est correct
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import {Link, useParams} from "react-router-dom";
import DeleteModal from "../../incs/modal/DeleteModal";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const YourPicture = () => {
    const {id} = useParams();
    const [pictures, setPictures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [redirect, setRedirect] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [articleId, setArticleToDeleteId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "d MMMM yyyy", {locale: fr}); // Utilisez le locale "fr" pour le français
    };

    const handleDeletePicture = (id) => {
        // Stockez l'ID de l'article à supprimer dans un état local
        setArticleToDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        destroyPicture(articleId);
        // Après la suppression, vous pouvez fermer le modal en utilisant setShowDeleteModal(false)
        setShowDeleteModal(false);
    };

    const handleModalClose = () => {
        setShowDeleteModal(false);
    };

    const destroyPicture = (pictureId) => {
        axios.delete(`https://de-lafontaine.ca/mealplanner/public/api/pictures/${pictureId}`)
            .then(() => {

                // Supprimez l'article de la liste locale
                const updatedPictures = pictures.filter((picture) => picture.id !== pictureId);
                setPictures(updatedPictures);

                // Mettez à jour le message de confirmation
                setConfirmationMessage("La Picture a été supprimé avec succès.");

                // Supprimez le message de confirmation après 3 secondes
                setTimeout(() => {
                    setConfirmationMessage("");

                }, 3000);

            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la picture : ", error);

            });
    }

    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (localStorage.getItem("token")) {
            axios.get(`https://de-lafontaine.ca/mealplanner/public/api/pictures-by-user?page=${currentPage}`, headers)
                .then((response) => {
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


    return (<>
        <NavBarBootstrap pageTitle="this->Picture"/>
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
                                <BallTriangleLoader/>
                            </div>) : (<>
                            {pictures.length === 0 ? ( // Vérifiez si la liste des pictures est vide
                                <div className="alert alert-danger">
                                    Désolé, aucune picture trouvée.
                                </div>) : (<div className="col-12 mx-auto">
                                <table className="table table-hover border border-dark">
                                    <thead>
                                    <tr className="table-dark">
                                        <th scope="col">ID</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Date Création</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {pictures.map((picture) => (
                                        <tr key={picture.id} className="table-active">
                                            <th scope="row">{picture.id}</th>
                                            <td className="text-center">
                                                <img
                                                    src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${picture.image}`}
                                                    className="img-fluid img__table"
                                                    alt="Thumbnail de l'image"/>
                                            </td>
                                            <td>{picture.title}</td>
                                            <td>{picture.description}</td>
                                            <td>{formatDate(picture.created_at)}</td>
                                            <td className="text-end">
                                                <Link to={`/pictures/${picture.id}`}>
                                                    <i className="fa-solid fa-code btn btn-sm btn-outline-dark"></i>
                                                </Link>
                                                <Link to={`/pictures/edit/${picture.id}`}>
                                                    <i className="fa-solid fa-pen-to-square ms-1 btn btn-sm btn-outline-warning"></i>
                                                </Link>

                                                <i className="fa-solid fa-delete-left ms-1 btn btn-sm btn-outline-danger"
                                                   onClick={() => handleDeletePicture(picture.id)}
                                                ></i>

                                                <DeleteModal
                                                    show={showDeleteModal}
                                                    onHide={handleModalClose}
                                                    onDelete={handleDeleteConfirm}
                                                />
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>)}

                            {/* Pagination */}
                            <div className="pagination-container">
                                <ul className="pagination">
                                    {Array.from({length: totalPages}, (_, i) => (<li
                                        className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                        key={i}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>))}
                                </ul>
                            </div>

                            <div className="add-btn-container bg-success">
                                <Link to="/pictures/new">
                                    <i className="fa-solid fa-square-plus"></i>
                                </Link>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default YourPicture;
