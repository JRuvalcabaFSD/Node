import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .option('b', { alias: 'base', type: 'number', demandOption: true, describe: 'Multiplication table base' })
  .option('l', { alias: 'limit', type: 'number', default: 10, describe: 'Multiplication table limit' })
  .option('s', { alias: 'show', type: 'boolean', default: false, describe: 'Show multiplication table' })
  .option('n', { alias: 'fileName', type: 'string', default: 'table of', describe: 'File name' })
  .option('d', { alias: 'fileDestinatios', type: 'string', default: 'ouputs', describe: 'File path' })
  .check((argv, options) => {
    if (argv.b < 1) throw 'Error: base must be greater than 0';
    return true;
  })
  .parseSync();
