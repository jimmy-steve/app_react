import React from 'react';
import {useParams} from 'react-router-dom';
import EditArticle from '../your/EditArticle';

function EditArticleWithParams() {
    const {id} = useParams();

    // Utilisez l'ID de l'article comme nécessaire ici

    return <EditArticle articleId={id}/>;
}

export default EditArticleWithParams;