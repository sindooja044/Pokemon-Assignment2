import { useState, useEffect } from 'react';

function useFetchPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((t) => t.type.name),
            };
          })
        );
        setPokemons(pokemonDetails);

        // Get all types for dropdown
        const allTypes = [
          ...new Set(pokemonDetails.flatMap((p) => p.types)),
        ];
        setTypes(allTypes);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load Pokémon data.');
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  return { pokemons, loading, error, types };
}

export default useFetchPokemons;
