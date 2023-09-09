import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import Axios from "axios";
import {useParams} from "react-router-dom";
import AppLoader from "../../incs/AppLoader";
import FavoriteBorderButton from "@material-ui/icons/FavoriteBorder";
import FavoriteButton from "@material-ui/icons/Favorite";
import {Link} from "react-router-dom";

const Picture = () => {
    const {id} = useParams();
    const [picture, setPicture] = useState({});
    const [like, setLike] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleLike = () => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };
        Axios.get(
            `https://de-lafontaine.ca/mealplanner/public/api/pictures/${id}/handlelike`,
            headers
        )
            .then((response) => {
                setLike(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

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
                `https://de-lafontaine.ca/mealplanner/public/api/pictures/${id}`,
                headers
            )
                .then((response) => {
                    setPicture(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });

            Axios.get(
                `https://de-lafontaine.ca/mealplanner/public/api/pictures/${id}/checklike`,
                headers
            )
                .then((response) => {
                    setLike(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else {
            setRedirect(true);
        }
    }, [id, like]);

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <>
            <NavBarBootstrap/>
            <div className="pictures container my-2">
                {picture && picture.user ? (
                    <div className="row justify-content-center mt-3">
                        <div className="col-8">
                            <img
                                src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${picture.image}`}
                                className="img-fluid"
                                alt="..."
                            />
                        </div>
                        <div className="col-4">
                            <h3>{picture.title}</h3>
                            <div className="author text-end mt-2">
                                <span className="text-muted">Par </span>
                                <span className="badge bg-primary">{picture.user?.name}</span>
                            </div>
                            <div className="date text-end mt-2">
                                <p>
                                    <span className="text-muted">Publié le </span>
                                    <span className="text-primary">
                    {new Date(picture.created_at).toLocaleDateString()}
                  </span>
                                </p>
                                <p>
                                    {like ? (
                                        <>
                                            <FavoriteButton
                                                onClick={handleLike}
                                                className="text-danger"
                                            />
                                            <span className="ms-2 text-danger">Je n'aime plus</span>
                                        </>
                                    ) : (
                                        <>
                                            <FavoriteBorderButton
                                                onClick={handleLike}
                                                className="text-muted"
                                            />
                                            <span className="ms-2 text-muted">J'aime</span>
                                        </>
                                    )}{" "}
                                </p>
                            </div>
                            <div className="description">
                                <p>{picture.description}</p>
                            </div>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="row">
                                <div className="col-3">
                                    <Link to="/album" className="btn btn-primary">
                                        <i className="fa-solid fa-arrow-left"></i> Retour
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center mt-5">
                        <AppLoader/>
                    </div>
                )}
            </div>
        </>
    );
};

export default Picture;
