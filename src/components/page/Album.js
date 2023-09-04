import React, { useState, useEffect } from "react";
import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import AppLoader from "../incs/AppLoader";

const Album = () => {
  const [search, setSearch] = useState("");
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    this.getArticles();
  };

  useEffect(() => {
    // Load articles on component mount

    const getArticles = () => {
      let bodyFormData = new FormData();
      bodyFormData.set("search", search);

      Axios.post(
        "https://de-lafontaine.ca/mealplanner/public/api/pictures",
        bodyFormData
      )
        .then((response) => {
          setPictures(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after request completes
        });
    };

    getArticles();
  }, [search]);

  return (
    <>
      <div className="container-fluid position-relative p-0">
        <NavBarBootstrap pageTitle="Super Album" />
        <SideBar />
        <div className="content">

          {isLoading ? ( // Display loader while loading
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
                        className="form-control mr-sm-2"
                        type="search"
                        name="search"
                        placeholder="Search a picture here ..."
                        onChange={handleSearchChange}
                      />
                    </form>
                  </div>

                  <div className="row justify-content-center mt-3">
                    {pictures.map((picture) => (
                      <div
                        className="card mx-2 mb-2"
                        key={picture.id}
                        style={{ width: "350px" }}
                      >
                        <img
                          src={`https://de-lafontaine.ca/mealplanner/storage/app/public/images/${picture.image}`}
                          className="card-img-top mt-2 rounded"
                          alt="..."
                          style={{ width: "320px", height: "250px" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{picture.title}</h5>
                          <Link
                            to={`/pictures/${picture.id}`}
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
        <button className="btn btn-lg btn-lg-square back-to-top">
          <i className="bi bi-arrow-up"></i>
        </button>
      </div>
    </>
  );
};

export default Album;
