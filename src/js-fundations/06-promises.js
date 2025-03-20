const http = require("../plugins/http-client.plugin")

const getPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}` 
  return await http.get(url)
}
module.exports = getPokemonById