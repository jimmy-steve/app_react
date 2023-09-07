import React, { useEffect, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import Axios from "axios";
import { useParams } from "react-router-dom";
import AppLoader from "../incs/AppLoader";


const RecipeDetail = () => {
  const { id } = useParams();
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
            console.log(response.data);
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
    return <Navigate to="/" />;
  }

  return (
      <>
        <NavBarBootstrap />
        <div className="container my-4">
          {isLoading ? ( // Vérifiez si les données sont en cours de chargement
              <div className="d-flex justify-content-center mt-5">
                <AppLoader />
              </div>
          ) : (
              <div className="row">
                <div className="col-md-8">
                  <h1>{article.title}</h1>
                  <p>{article.subtitle}</p>
                  <img src={article.image} alt={article.title} />
                  <p>{article.content}</p>
                </div>

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
