import React, { useState, useEffect } from 'react';
import './sliderpano.css';

function SliderPano2({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Utilisation de useEffect pour précharger les images
  useEffect(() => {
    // Créer un tableau d'images à précharger
    const imagesToPreload = slides.map((slide) => new Image().src = slide.image);

    // Écouteur d'événement pour gérer le changement de diapositive
    const handleSlideChange = () => {
      // Vous pouvez ajouter ici des actions supplémentaires lors du changement de diapositive
    };

    // Ajout de l'écouteur d'événement au composant Carousel
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('slid.bs.carousel', handleSlideChange);

    return () => {
      // Retirer l'écouteur d'événement lors du démontage du composant
      carousel.removeEventListener('slid.bs.carousel', handleSlideChange);
    };
  }, [slides]); // Le tableau de dépendances s'assure que useEffect s'exécute lorsque slides change

  return (
      <div className="carousel">
        <div className="carousel-inner">
          {slides.map((slide, i) => (
              <div
                  key={slide.image}
                  className={`carousel-item${i === index ? ' active' : ''}`}
              >
                <img
                    className="d-block w-100"
                    src={slide.image}
                    alt={`Slide ${i + 1}`}
                />
                <div className="carousel-caption">
                  <h3>{slide.title}</h3>
                  <p>{slide.subTitle}</p>
                </div>
              </div>
          ))}
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target=".carousel"
            data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target=".carousel"
            data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
  );
}

export default SliderPano2;
