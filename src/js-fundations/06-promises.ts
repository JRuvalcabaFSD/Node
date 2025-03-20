import { httpClient } from '../plugins';

export const getPokemonById = async (id: string | number): Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return await httpClient.get(url);
};
