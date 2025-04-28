// PokemonCard.jsx
import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <p className="pokemon-id">#{pokemon.id}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span key={type} className="type-badge">{type}</span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
