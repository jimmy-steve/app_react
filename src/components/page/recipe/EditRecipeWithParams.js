import React from 'react';
import {useParams} from 'react-router-dom';
import EditRecipe from '../recipe/EditRecipe';

function EditRecipeWithParams() {
    const {id} = useParams();

    // Utilisez l'ID de l'article comme nécessaire ici

    return <EditRecipe recipeId={id}/>;
}

export default EditRecipeWithParams;