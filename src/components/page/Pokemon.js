import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Pokemon = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [showAllMoves, setShowAllMoves] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, types, weight, height, abilities, moves, stats } = pokemonData;
  const movesToShowCount = showAllMoves ? moves.length : 5;
  const movesToShow = moves.slice(0, movesToShowCount);

  const getPokemonImageUrl = (pokemonId) => {
    // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`; // DREAM WORLD
    // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`; // OFFICIAL ARTWORK
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`; // HOME
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card card-custom border border-light">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h1 className="card-title capitalize-title text-end">
                    {name}
                  </h1>
                  <img
                    src={getPokemonImageUrl(pokemonData.id)}
                    alt={name}
                    className="card-img-top"
                  />
                </div>
                <div className="col-12 col-md-6 mt-5">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h2 className="card-title capitalize-title text-end">
                        Types
                      </h2>
                      <ul className="list-group list-group-flush">
                        {types.map((type, index) => (
                          <li
                            className="list-group-item capitalize-title"
                            key={index}
                          >
                            {type.type.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <h2 className="card-title capitalize-title text-end">
                        Abilities
                      </h2>
                      <ul className="list-group list-group-flush">
                        {abilities.map((ability, index) => (
                          <li
                            className="list-group-item capitalize-title"
                            key={index}
                          >
                            {ability.ability.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h2 className="card-title capitalize-title text-end">
                        Weight
                      </h2>
                      <p className="card-text">{weight}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <h2 className="card-title capitalize-title text-end">
                        Height
                      </h2>
                      <p className="card-text">{height}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h2 className="card-title capitalize-title text-end">
                        Stats
                      </h2>
                      <ul className="list-group list-group-flush">
                        {stats.map((stat, index) => (
                          <li
                            className="list-group-item capitalize-title"
                            key={index}
                          >
                            {stat.stat.name} : {stat.base_stat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <h2 className="card-title capitalize-title text-end">
                        Moves
                      </h2>
                      <ul className="list-group list-group-flush">
                        {movesToShow.map((move, index) => (
                          <li
                            className="list-group-item capitalize-title"
                            key={index}
                          >
                            {move.move.name}
                          </li>
                        ))}
                      </ul>
                      {moves.length > 5 && (
                        <button
                          className="btn btn-outline-primary mt-2"
                          onClick={() => setShowAllMoves(!showAllMoves)}
                        >
                          {showAllMoves ? "Show Less" : "Show All"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Link to={`/pokedex/`} className="btn btn-outline-primary mb-2">
                <i class="fa-solid fa-arrow-left"></i> My Pokedex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
