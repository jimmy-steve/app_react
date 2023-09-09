import React, {useState, useEffect} from "react";
import {NavDropdown} from "react-bootstrap";
import Axios from "axios";
import {Link} from "react-router-dom";
import DnaLoader from "./DnaLoader";

function BlogDropdown() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Ajoutez un état pour le chargement initial

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        // Effectuez la requête pour obtenir les catégories depuis l'API
        Axios.get("https://de-lafontaine.ca/mealplanner/public/api/category")
            .then((response) => {
                // Mettez à jour l'état avec les données de l'API
                setCategories(response.data);
                setLoading(false); // Mettez à jour l'état de chargement à false une fois les données chargées
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des catégories :", error);
                setLoading(false); // Assurez-vous de mettre à jour l'état de chargement en cas d'erreur
            });
    }, []);

    if (loading) {
        // Si les données sont en cours de chargement, affichez un message de chargement ou un indicateur
        return <DnaLoader/>;
    }

    return (
        <>
            {/* <li className="nav-item dropdown">*/}
            {/*     <a*/}
            {/*        className="nav-link dropdown-toggle"*/}
            {/*        role="button"*/}
            {/*        aria-haspopup="true"*/}
            {/*        aria-expanded={isOpen}*/}
            {/*        onClick={toggleDropdown}*/}
            {/*    >*/}
            {/*        Blog*/}
            {/*    </a>*/}
            {/*    <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>*/}
            {/*        {categories.map((category) => (*/}
            {/*            <Link*/}
            {/*                to={`/blog/category/${category.id}`}*/}
            {/*                className="dropdown-item"*/}
            {/*                key={category.id}*/}
            {/*            >*/}
            {/*                {category.label}*/}
            {/*            </Link>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</li>*/}

        </>
    );
}

export default BlogDropdown;
