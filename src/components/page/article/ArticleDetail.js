import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import Axios from "axios";
import {useParams} from "react-router-dom";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import Heart from '../../incs/common/Heart'
import Footer from "../../incs/common/Footer";

const RecipeDetail = () => {
    const {id} = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état isLoading
    const [toggle, setToggle] = useState(false)

    const handleClick = () => {
        setToggle(!toggle)
    }

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

        // if (localStorage.getItem("token")) {
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
        // } else {
        //     setRedirect(true);
        // }
    }, [id]);

    if (redirect) {
        return <Navigate to="/login"/>;
    }

    return (
        <>
            <NavBarBootstrap/>
            <div className="container-fluid my-4">
                {isLoading ? ( // Vérifiez si les données sont en cours de chargement
                    <div className="d-flex justify-content-center mt-5">
                        <TriangleLoader/>
                    </div>
                ) : (
                    <div className="row m-1">
                        <div className="container-card">
                            <div className="row">
                                <div className="col text-end">
                                    <Heart
                                        handleClick={handleClick}
                                        toggle={toggle} />
                                </div>
                            </div>

                            <div className="cercle-image">
                                <img
                                    src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${article.image}`}
                                    className="img-fluid"
                                    alt="Thumbnail de l'image"/>
                            </div>
                            <h2 className="article-title mt-4">{article.title}</h2>
                            <p>{article.subtitle}</p>
                            <div
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            ></div>
                        </div>

                        <div className="text-end mt-4">
                            <Link to="/blog" className="btn btn-primary">
                                <i className="fa-solid fa-arrow-left"></i> Retour
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default RecipeDetail;
