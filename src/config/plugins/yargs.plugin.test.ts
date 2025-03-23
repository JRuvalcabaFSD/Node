const originalArgv = process.argv;

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('./yargs.plugin');
  return yarg;
};

describe('yargs.plugins', () => {
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table of',
        d: 'ouputs',
      }),
    );
  });

  test('should return custom values', async () => {
    const argv = await runCommand(['-b', '10', '-l', '20', '-s', 'true', '-n', 'custom-name', '-d', 'custom-path']);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 20,
        s: true,
        n: 'custom-name',
        d: 'custom-path',
      }),
    );
  });
});
