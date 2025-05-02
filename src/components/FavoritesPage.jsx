import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) return <p style={{ padding: "1rem" }}>No favorites yet.</p>;

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>My Favorite Pokémon</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {favorites.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", width: "150px" }}>
              <h3>{pokemon.name}</h3>
              <p>ID: {pokemon.id}</p>
              <p>Types: {pokemon.types.join(", ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
