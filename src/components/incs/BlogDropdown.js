import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import Axios from "axios";

function BlogDropdown() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Effectuez la requête pour obtenir les catégories depuis l'API
        Axios.get("https://de-lafontaine.ca/mealplanner/public/api/category")
            .then((response) => {
                // Mettez à jour l'état avec les données de l'API
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des catégories :", error);
            });
    }, []);

    return (
        <NavDropdown title="Blog" id="basic-nav-dropdown">
            {categories.map((category) => (
                <NavDropdown.Item key={category.id} href="#">
                    {category.label}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
}

export default BlogDropdown;
