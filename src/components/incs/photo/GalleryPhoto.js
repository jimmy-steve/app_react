import React, { useState, useEffect } from "react";
import NavBarBootstrap from "../common/NavBarBootstrap";
import PhotoAlbum from "react-photo-album";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Assurez-vous d'importer le CSS de la bibliothèque
import SliderPhoto from "./SliderPhoto";

import photos from "./Photos";

const GalleryPhoto = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const imageCount = photos.length;
        let loadedImages = 0;

        const imageLoaded = () => {
            loadedImages++;
            if (loadedImages === imageCount) {
                setLoading(false);
            }
        };

        photos.forEach((photo) => {
            const image = new Image();
            image.src = photo.src;
            image.onload = imageLoaded;
        });

        return () => {
            // Nettoyez les gestionnaires d'événements ici si nécessaire
        };
    }, []);

    const openLightbox = (event, photo, index) => {
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <>
            <NavBarBootstrap pageTitle={"Photo Gallery"} />


            <div className="container-fluid">

                {loading ? (
                    // Affichez une indication de chargement ici
                    <div>Loading...</div>
                ) : (
                    <div className="row">
                        <PhotoAlbum
                            layout="columns"
                            photos={photos}
                            onClick={openLightbox}
                        />
                    </div>
                )}
            </div>

            {lightboxOpen && (
                <Lightbox
                    mainSrc={photos[photoIndex].src}
                    nextSrc={photos[(photoIndex + 1) % photos.length].src}
                    prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].src}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() => {
                        const newIndex = (photoIndex + photos.length - 1) % photos.length;
                        setPhotoIndex(newIndex);
                    }}
                    onMoveNextRequest={() => {
                        const newIndex = (photoIndex + 1) % photos.length;
                        setPhotoIndex(newIndex);
                    }}
                />
            )}
        </>
    );
};

export default GalleryPhoto;
