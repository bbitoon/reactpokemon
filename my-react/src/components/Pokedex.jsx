import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

class PokemonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonName: '',
      pokemonImage: ''
    };
    this.apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  }

  getPokemonData = () => {
    const input = document.querySelector(".pokemon-input");
    axios.get(this.apiUrl + input.value)
      .then((response) => {
        this.setState({
          pokemonName: response.data.forms[0].name,
          pokemonImage: response.data.sprites.front_default
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({
          pokemonName: '(An error has occurred.)',
          pokemonImage: ''
        });
      });
  }

  render() {
    return (
      <div>
        <input className="pokemon-input" type="text" />
        <button className="pokemon-button" onClick={this.getPokemonData}>Get Pokemon</button>
        <div className="pokemon-name">{this.state.pokemonName}</div>
        <img className="pokemon-image" src={this.state.pokemonImage} alt="Pokemon" />
      </div>

      
    );
  }
}

export default Pokedex;




// function Pokedex() {
//   const { pokeName } = useParams();
//   const [pokeDex, setPokeDex] = useState(undefined);

//   const pokemonList = ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Eevee"];

//   function PokemonDropdown() {
//     const [selectedPokemon, setSelectedPokemon] = useState("");
  
//     const handleSelectChange = (event) => {
//       setSelectedPokemon(event.target.value);
//     };
  
//     const getRandomPokemon = () => {
//       const randomIndex = Math.floor(Math.random() * pokemonList.length);
//       setSelectedPokemon(pokemonList[randomIndex]);
//     };
  
//     return 

        
    
//   }
 




//   useEffect(() => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         // setPokeDex({
//         //   name: data?.name,
//         //   height: data?.height,
//         // });

//       })
//       .catch((err) => setPokeDex(undefined));


//     return () => { };
//      }, []);
//     return (
//       <div style={{ backgroundImage: `url(${imageUrl})` }}> 
     
   
        


//       {pokeDex != undefined ? (
//         <>
          


//           <b>name: {pokeDex?.name} </b> &nbps; <b>height: {pokeDex?.height} </b>
//         </>
//       ) : (
//         <>
//           <b>Pokemon not found</b>
//         </>
//       )}
//     </div>
//   );
// }
