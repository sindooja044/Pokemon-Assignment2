import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        setPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          abilities: data.abilities.map((a) => a.ability.name),
          moves: data.moves.slice(0, 5).map((m) => m.move.name),
          sprite: data.sprites.front_default,
          speciesUrl: data.species.url,
        });

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoList = [];
        let current = evoData.chain;

        while (current) {
          evoList.push(current.species.name);
          current = current.evolves_to[0];
        }

        setEvolutionChain(evoList);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Pokémon details", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading Pokémon details...</p>;
  if (!pokemon) return <p style={{ padding: "1rem" }}>Pokémon not found.</p>;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        ← Back to list
      </Link>

      <div style={styles.card}>
        <img src={pokemon.sprite} alt={pokemon.name} style={styles.image} />

        <h2 style={styles.name}>
          #{pokemon.id} {pokemon.name.toUpperCase()}
        </h2>

        <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>

        <div style={styles.section}>
          <h3>Stats</h3>
          <ul style={styles.list}>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                <strong>{stat.name}:</strong> {stat.value}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Abilities</h3>
          <ul style={styles.list}>
            {pokemon.abilities.map((ability) => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Moves (First 5)</h3>
          <ul style={styles.list}>
            {pokemon.moves.map((move) => (
              <li key={move}>{move}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Evolution Chain</h3>
          <p>{evolutionChain.join(" → ")}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  backLink: {
    textDecoration: "none",
    color: "#007bff",
    marginBottom: "1rem",
    display: "inline-block",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "500px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  image: {
    height: "120px",
    display: "block",
    margin: "0 auto 1rem",
  },
  name: {
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  section: {
    marginTop: "1.5rem",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    lineHeight: "1.6",
  },
};

export default PokemonDetail;
