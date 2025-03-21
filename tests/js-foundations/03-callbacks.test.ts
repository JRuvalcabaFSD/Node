import { getUserById } from '../../src/js-fundations/03-callbacks';

describe('03-callback', () => {
  test('getUserById should return an error if user does not exists', (done) => {
    const id = 10;
    getUserById(id, (err, user) => {
      expect(err).toEqual(new Error(`User not found by id: ${id}`));
      expect(user).toBeUndefined();
      done();
    });
  });
  test('getUserById should return a user if user exists', (done) => {
    const id = 1;
    getUserById(id, (err, user) => {
      expect(err).toBeUndefined();
      expect(user).toEqual({ id: 1, name: 'john Doe' });
      done();
    });
  });
});
