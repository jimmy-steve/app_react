import React, { useEffect, useState } from "react";
import Axios from "axios";
import SideBar from "../incs/SideBar";
import Footer from "../incs/Footer";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import { Link } from "react-router-dom";

const Pokedex = ({ argumentToDisplay }) => {
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
    <div className="container-fluid position-relative p-0">
      <SideBar />
      <div className="content">
        <NavBarBootstrap pageTitle="Pokedex" />
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
        <button className="btn btn-lg btn-lg-square back-to-top">
          <i className="bi bi-arrow-up"></i>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Pokedex;
