

const fetchPokemon = async() => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
      return response?.data
    }catch (error){
        return Promise.reject()

    }

    }



