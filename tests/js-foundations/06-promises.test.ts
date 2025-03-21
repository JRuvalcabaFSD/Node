import { getPokemonById } from '../../src/js-fundations/06-promises';

describe('06-promises', () => {
  test('should return an object of type pokemon', async () => {
    const id = 1;
    const pokemonName = await getPokemonById(id);
    expect(pokemonName).toEqual('bulbasaur');
  });
  test('should return an error not found', async () => {
    const id = 1000000;
    await expect(getPokemonById(id)).rejects.toThrow(
      `Pokemon not found width id ${id}`,
    );
  });
});
