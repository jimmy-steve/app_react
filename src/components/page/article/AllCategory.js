import React, {useState, useEffect} from "react";
import SideBar from "../../incs/SideBar";
import NavBarBootstrap from "../../incs/NavBarBootstrap";
import {Link} from "react-router-dom";
import Axios from "axios";
import AppLoader from "../../incs/AppLoader";
import Footer from "../../incs/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";
import CustomBreadcrumb from "../../incs/BreadCrumb";
import DnaLoader from "../../incs/DnaLoader";
import InfiniLoader from "../../incs/InfiniLoader";

const Article = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        const getArticles = (page) => {
            Axios.get(`https://de-lafontaine.ca/mealplanner/public/api/articles?page=${page}`)
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

        const getCategories = () => {
            Axios.get("https://de-lafontaine.ca/mealplanner/public/api/category")
                .then((response) => {
                    setCategories(response.data);
                    setLoadingCategories(false);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des catégories :", error);
                });
        }

        getArticles(currentPage); // Load articles for the initial page
        getCategories();
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
                    <div className="col-md-8 col-lg-10">
                        <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                        <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                        <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                        <CustomBreadcrumb pageTitle={"all"}/>

                        {isLoading ? (
                            <div className="d-flex justify-content-center mt-5">
                                <AppLoader/>
                            </div>
                        ) : (
                            <div className="container-fluid px-2">
                                <div className="row g-4">
                                    <div className="col-md-2 d-none d-md-block">
                                        <ul className="list-group">
                                            {loadingCategories ? (
                                                <li className="text-center list-group-item list-group-item-secondary">
                                                    <DnaLoader/>
                                                </li>
                                            ) : (
                                                categories.map((category) => (
                                                    <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"
                                                        key={category.id}>
                                                        <Link to={`/blog/category/${category.id}`}>
                                                            {category.label}
                                                        </Link>
                                                        <span
                                                            className="badge bg-primary rounded-pill">{category.article_count}</span>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>


                                    <div className="col-12 col-md-10 my-3">
                                        <div className="row justify-content-center">
                                            {articles.map((article) => (
                                                <div className="container-card m-3">
                                                    <div className="cercle"></div>
                                                    <h3>{article.title}</h3>
                                                    <p>
                                                        {article.content && article.content.length > 200
                                                            ? article.content.substring(0, 200) + "..."
                                                            : article.content}
                                                    </p>
                                                    <Link
                                                        to={`/blog/${article.id}`}
                                                        className="btn mb-2 btn-sm btn-primary"
                                                    >
                                                        En savoir plus
                                                    </Link>
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

export default Article;
