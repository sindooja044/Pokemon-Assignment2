import PokemonCard from './PokemonCard';

function PokemonList({ pokemons }) {
  if (pokemons.length === 0) {
    return <p>No Pokémon found!</p>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
