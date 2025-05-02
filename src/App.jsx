import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import FavoritesPage from "./components/FavoritesPage";
import { FavoritesProvider, FavoritesContext } from "./contexts/FavoritesContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import ComparePage from "./components/ComparePage";


const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();

        // Fetch full details for each Pokémon
        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const fullData = await res.json();
            return {
              id: fullData.id,
              name: fullData.name,
              types: fullData.types.map((t) => t.type.name),
              image: fullData.sprites.front_default, // ✅ Add this to show images
            };
          })
        );

        setPokemons(details);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load Pokémon:", err);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <FavoritesProvider>
      <ComparisonProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loading ? <p>Loading...</p> : <PokemonList pokemons={pokemons} />
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />

        </Routes>
      </Router>
      </ComparisonProvider>
    </FavoritesProvider>
  );
};

export default App;
