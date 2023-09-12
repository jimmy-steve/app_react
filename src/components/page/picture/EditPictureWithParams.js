import React from 'react';
import {useParams} from 'react-router-dom';
import EditPicture from '../picture/EditPicture';

function EditPictureWithParams() {
    const {id} = useParams();

    // Utilisez l'ID de l'article comme nécessaire ici

    return <EditPicture pictureId={id}/>;
}

export default EditPictureWithParams;