import React, { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { ComparisonContext } from "../contexts/ComparisonContext";

const PokemonList = ({ pokemons }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { toggleCompare, selectedForComparison } = useContext(ComparisonContext);

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState("id-asc");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const sortedPokemons = useMemo(() => {
    const sorted = [...pokemons];
    switch (sortOption) {
      case "id-desc":
        return sorted.sort((a, b) => b.id - a.id);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted.sort((a, b) => a.id - b.id);
    }
  }, [pokemons, sortOption]);

  const filteredPokemons = useMemo(() => {
    if (selectedTypes.length === 0) return sortedPokemons;
    return sortedPokemons.filter((p) =>
      selectedTypes.every((type) => p.types.includes(type))
    );
  }, [sortedPokemons, selectedTypes]);

  const {
    currentData,
    currentPage,
    maxPage,
    next,
    prev,
  } = usePagination(filteredPokemons, itemsPerPage);

  const allTypes = useMemo(() => {
    const types = new Set();
    pokemons.forEach((p) => p.types.forEach((t) => types.add(t)));
    return [...types];
  }, [pokemons]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Favorites Link */}
      <Link
        to="/favorites"
        style={{
          margin: "1rem",
          display: "inline-block",
          color: "#007bff",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        ⭐ View Favorites
      </Link>

      {/* Compare Link */}
      <Link
        to="/compare"
        style={{
          margin: "1rem",
          display: "inline-block",
          color: "#007bff",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        🆚 Compare Pokémon
      </Link>

      {/* Controls */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Items per page: </label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <label style={{ marginLeft: "1rem" }}>Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="id-asc">ID (Ascending)</option>
          <option value="id-desc">ID (Descending)</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
        </select>
      </div>

      {/* Type Filters */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by Type:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: selectedTypes.includes(type) ? "#007bff" : "#e0e0e0",
                color: selectedTypes.includes(type) ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Pokémon Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {currentData.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="pokemon-card"
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                width: "150px",
                position: "relative",
              }}
            >
              {pokemon.image && (
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
              )}
              <h3>{pokemon.name}</h3>
              <p>ID: {pokemon.id}</p>
              <p>Types: {pokemon.types.join(", ")}</p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(pokemon);
                }}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: isFavorite(pokemon.id) ? "gold" : "#ccc",
                }}
                title="Toggle Favorite"
              >
                ★
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleCompare(pokemon);
                }}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.25rem 0.5rem",
                  backgroundColor: selectedForComparison.find((p) => p.id === pokemon.id)
                    ? "orange"
                    : "#eee",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {selectedForComparison.find((p) => p.id === pokemon.id)
                  ? "Remove"
                  : "Compare"}
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "1rem" }}>
        <button disabled={currentPage === 1} onClick={prev}>
          Prev
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {currentPage} of {maxPage}
        </span>
        <button disabled={currentPage === maxPage} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
