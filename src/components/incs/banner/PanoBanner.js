import React from "react";
import ImagePano1 from "../../../assets/img/pano/pano1.jpg";
import ImagePano2 from "../../../assets/img/pano/pano2.jpg";
import ImagePano3 from "../../../assets/img/pano/pano3.jpg";


import SliderPano from "./SliderPano";


const slides = [
    {
        image: ImagePano1,
        title: "Des moments inoubliables en famille au Mont Orford",
        subTitle: "Sortez en grand aux Mont Orford",
        interval: 3000,
    },
    {
        image: ImagePano2,
        title: "Plaisir et détente entre amis à Sand Banks",
        subTitle: "Sand Banks",
        interval: 3000,
    },
    {
        image: ImagePano3,
        title: "Exploration en plein air au Parc des Laurentides",
        subTitle: "Nature préservée et activités passionnantes",
        interval: 3000,
    },
];

const PanoBanner = () => {

    return (
        <>
            <SliderPano slides={slides}/>
        </>
    );

};

export default PanoBanner;