import { characters } from '../../src/js-fundations/02-destructuring'; // Import the function to test

describe('02-destructuring', () => {
  test('characters should contain flas, superman', () => {
    expect(characters).toContain('flash');
    expect(characters).toContain('superman');
  });
  test('first character should be flash, and second superman', () => {
    const [flash, superman] = characters;
    expect(flash).toBe('flash');
    expect(superman).toBe('superman');
  });
});
