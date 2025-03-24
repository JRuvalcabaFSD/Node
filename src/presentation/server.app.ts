import { CreateTable } from '../domain/uses-cases/create-table.use-case';
import { SaveFile } from '../domain/uses-cases/save-file.use-case';

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
  static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
    console.log('Server running...');

    const table = new CreateTable().execute({ base, limit });
    const wasCreate = new SaveFile().execute({ fileContet: table, fileName: `${fileName} ${base}`, fileDestination });

    wasCreate ? console.log('File created!') : console.error('File not created!');
    showTable && console.log(table);
  }
}
