import React from "react";
import FLogo from "../../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";
import Slider from "./Slider";
import slides from './mock.json'

const Banner = () => {

    return (
        <>
            <Slider slides={slides}/>
        </>
    );

};

export default Banner;