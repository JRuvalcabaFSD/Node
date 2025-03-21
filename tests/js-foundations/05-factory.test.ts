import { buildMakePerson } from '../../src/js-fundations/05-factory';
import { getAge } from '../../src/plugins/getAge.plugin';

describe('05-factory', () => {
  const getUuid = () => '1234';
  const getAge = () => 35;

  test('buildMakePerson should return a function', () => {
    const makePerson = buildMakePerson({ getAge, getUuid });
    expect(typeof makePerson).toBe('function');
  });

  test('makePerson should be debolted by a person object ', () => {
    const makePerson = buildMakePerson({ getAge, getUuid });
    const johnDoe = makePerson({ name: 'Jesus', birdthDate: '1981-12-24' });
    expect(johnDoe).toEqual({
      id: '1234',
      name: 'Jesus',
      birdthDate: '1981-12-24',
      age: 35,
    });
  });
});
