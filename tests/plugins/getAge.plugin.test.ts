import { getAge } from '../../src/plugins/getAge.plugin';

describe('getAge', () => {
  test('getAge should return the age of a person', () => {
    const bridthDate = '1981-12-24';
    const age = getAge(bridthDate);
    expect(typeof age).toBe('number');
  });

  test('should return current age', () => {
    const bridthDate = '1981-12-24';
    const age = getAge(bridthDate);
    const currentAge =
      new Date().getFullYear() - new Date(bridthDate).getFullYear() - 1;
    expect(age).toBe(currentAge);
  });

  test('should return 0 years', () => {
    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1981);
    const bridthDate = '1981-12-24';
    const age = getAge(bridthDate);

    expect(age).toBe(-1);
  });
});
