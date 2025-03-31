import { envs } from './envs-plugins';
describe('envs-prugins', () => {
  test('should return envs options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'smtp.gmail.com',
      MAILER_EMAIL: 'jruvalcaddddbafsd@gmail.com',
      MAILER_SECRET_KEY: 'mpswnkgdlgvgpzzl',
      PROD: false,
      MONGO_URL: 'mongodb://jesus:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'jesus',
      MONGO_PASS: '123456',
    });
  });
  test('should return error if not funds env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs-plugins');
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toContain(`"PORT" should be a valid integer`);
    }
  });
});
