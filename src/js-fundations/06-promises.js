const getPokemonById = (id,callback) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}` 
  fetch(url).then(resp => {
    resp.json().then(pokemon => {
      callback(pokemon.name)
    })
    
  })
}


module.exports = getPokemonById