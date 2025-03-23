import { existsSync, readFileSync, rmSync } from 'fs';
import { SaveFile } from './save-file.use-case';

describe('saveFile', () => {
  const options = {
    fileContet: 'custon ontent',
    fileDestination: 'custom-oputs',
    fileName: 'custom-name',
  };

  afterEach(() => {
    if (existsSync('ouputs')) rmSync('ouputs', { recursive: true });
    if (existsSync('custom-oputs')) rmSync('custom-oputs', { recursive: true });
  });

  test('should save files with default options', () => {
    const saveFile = new SaveFile();
    const options = { fileContet: 'test content' };
    const filePath = 'ouputs/table.txt';

    const result = saveFile.execute(options);

    const fileExists = existsSync(filePath);
    const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContet);
  });
  test('should save file with custom options', () => {
    new SaveFile().execute(options);
    const fileExists = existsSync(options.fileDestination);
    const fileContent = readFileSync(`${options.fileDestination}/${options.fileName}.txt`, { encoding: 'utf-8' });

    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContet);
  });
});
