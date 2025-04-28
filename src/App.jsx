import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';
import useFetchPokemons from './hooks/useFetchPokemons';
import './App.css';

function App() {
  const { pokemons, loading, error, types } = useFetchPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === '' || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  return (
    <div className="app">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          types={types}
        />
      </div>

      {loading && <p>Loading Pokémons...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <PokemonList pokemons={filteredPokemons} />}
    </div>
  );
}

export default App;
