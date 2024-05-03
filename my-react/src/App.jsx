import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function PokemonPicker({ pokemonList, selectedPokemon, onSelectChange, selectedPokemonImage }) {
  return (
    <div>
     
      <select value={selectedPokemon} onChange={onSelectChange}>
        <option value="">Select a Pokemon</option>
        {pokemonList.map((pokemon, index) => (
          <option key={index} value={pokemon.name}>{pokemon.name}</option>
        ))}
      </select>
      <h2>{selectedPokemon}</h2>
      {selectedPokemonImage && (
        <img src={selectedPokemonImage} alt={selectedPokemon} style={{ maxWidth: '200px' }} />
      )}
    </div>
  );
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedPokemonImage, setSelectedPokemonImage] = useState('');
  const [opponentPokemonList, setOpponentPokemonList] = useState([]);
  const [selectedOpponentPokemon, setSelectedOpponentPokemon] = useState('');
  const [selectedOpponentPokemonImage, setSelectedOpponentPokemonImage] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const fetchOpponentPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151');
        setOpponentPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching opponent Pokemon list:', error);
      }
    };

    fetchOpponentPokemonList();
  }, []);

  const handleSelectChange = async (event) => {
    const pokemonName = event.target.value;
    setSelectedPokemon(pokemonName);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setSelectedPokemonImage(response.data.sprites.other.showdown.back_default);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const handleOpponentSelectChange = async (event) => {
    const pokemonName = event.target.value;
    setSelectedOpponentPokemon(pokemonName);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setSelectedOpponentPokemonImage(response.data.sprites.other.showdown.front_default);
    } catch (error) {
      console.error('Error fetching opponent Pokemon data:', error);
    }
  };

  return (
    <div className='grid-container'>
      <div className='left-panel'>
        <PokemonPicker
          pokemonList={pokemonList}
          selectedPokemon={selectedPokemon}
          onSelectChange={handleSelectChange}
          selectedPokemonImage={selectedPokemonImage}
        />
      </div>
      <div className='right-panel'>
        <PokemonPicker
          pokemonList={opponentPokemonList}
          selectedPokemon={selectedOpponentPokemon}
          onSelectChange={handleOpponentSelectChange}
          selectedPokemonImage={selectedOpponentPokemonImage}
        />
      </div>
    </div>
  );
}








export default App;
