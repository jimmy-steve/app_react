import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import Axios from "axios";
import {useParams} from "react-router-dom";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import LittleBanner from "../../incs/banner/LittleBanner";
import FavoriteBorderButton from "@material-ui/icons/FavoriteBorder";


const RecipeDetail = () => {
    const {id} = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading

    const [redirect, setRedirect] = useState(false);
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
                `https://de-lafontaine.ca/mealplanner/public/api/articles/${id}`,
                headers
            )
                .then((response) => {
                    console.log(response.data.article.content);
                    setArticle(response.data.article);


                    setIsLoading(false); // Mettez isLoading à false lorsque les données sont chargées
                })
                .catch((error) => {
                    console.log(error.response);
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
            <div className="container my-4">
                {isLoading ? ( // Vérifiez si les données sont en cours de chargement
                    <div className="d-flex justify-content-center mt-5">
                        <TriangleLoader/>
                    </div>
                ) : (
                    <div className="row">


                        <div className="container-card m-3">

                            <div className="btn-like-article text-end">
                                <FavoriteBorderButton
                                    className="text-danger"
                                />
                                <span className="ms-2 text-danger">I love this stuff !!</span>
                            </div>



                            <div className="cercle-image">
                                <img
                                    src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${article.image}`}
                                    className="img-fluid"
                                    alt="Thumbnail de l'image"/>
                            </div>
                            <h2 className="article-title">{article.title}</h2>
                            <p>{article.subtitle}</p>
                            <div
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            ></div>
                        </div>
                        {/*<LittleBanner/>*/}

                        <div className="text-end mt-4">
                            <Link to="/blog" className="btn btn-primary">
                                <i className="fa-solid fa-arrow-left"></i> Retour
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RecipeDetail;
