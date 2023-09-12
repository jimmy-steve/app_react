import React, {useState, useEffect} from "react";
import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import AppLoader from "../../incs/loader/AppLoader";
import Footer from "../../incs/common/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const Category = () => {
    const {id} = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        const getArticles = (page) => {
            Axios.get(`https://de-lafontaine.ca/mealplanner/public/api/articles/category/${id}`)
                .then((response) => {
                    setArticles(response.data.data);
                    setTotalPages(response.data.last_page);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        getArticles(currentPage); // Load articles for the initial page
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <NavBarBootstrap pageTitle="Blog"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">
                        <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                        <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                        <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                        <ol className="breadcrumb">

                            <li className="breadcrumb-item">
                                <Link
                                    className=""
                                    to="/"
                                >
                                    home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link
                                    className=""
                                    to="/blog"
                                >
                                    blog
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">
                                category / {id}
                            </li>
                        </ol>

                        {isLoading ? (
                            <div className="d-flex justify-content-center mt-5">
                                <AppLoader/>
                            </div>
                        ) : (
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    <div className="container my-3">
                                        <div className="row justify-content-center mt-3">
                                            {articles.map((article) => (
                                                <div
                                                    className="card mx-2 mb-2"
                                                    key={article.id}
                                                    style={{width: "320px"}}
                                                >
                                                    <div className="card-body">
                                                        <h5 className="card-title">{article.title}</h5>
                                                        <Link
                                                            to={`/blog/${article.id}`}
                                                            className="btn btn-primary"
                                                        >
                                                            En savoir plus
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="row justify-content-center mt-3 pagination-container">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination">
                                                    {Array.from({length: totalPages}, (_, i) => (
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
            <Footer/>
        </>
    );
};

export default Category;
