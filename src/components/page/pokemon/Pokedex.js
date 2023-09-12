import React, {useEffect, useState} from "react";
import Axios from "axios";
import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import {Link} from "react-router-dom";
import Footer from "../../incs/common/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

const Pokedex = ({argumentToDisplay}) => {
    // const API = "https://pokeapi.co/api/v2/pokemon?limit=151";
    const API2 = "https://pokeapi.co/api/v2/pokemon?offset=$3&limit=60";
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await Axios.get(API2);
                setPokemonList(response.data.results);
                console.log(response.data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPokemonList();
    }, []);

    const getPokemonImageUrl = (pokemonId) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`; // HOME
    };

    return (
        <>


            <NavBarBootstrap pageTitle="Pokedex"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">
                        <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                        <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                        <img className="small-circle" src={Eclipse3} alt="small-circle"/>


                        <div className="container-fluid px-4">
                            <div className="row g-4 mt-1">
                                {pokemonList.map((pokemon, index) => (
                                    <div className="col-md-4 col-sm-6 col-lg-3" key={index}>
                                        <div className="card card-custom border border-light">
                                            <div className="card-body">
                                                <Link to={`/pokemon/${pokemon.name}`}>
                                                    <h3 className="card-title capitalize-title text-end">
                                                        {pokemon.name}
                                                    </h3>
                                                    <img
                                                        src={getPokemonImageUrl(index + 1)}
                                                        alt={pokemon.name}
                                                        className="card-img-top"
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <Footer/>
        </>

    );
};

export default Pokedex;
