import boxen from 'boxen';
import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

(async () => {
  main();
})();

async function main() {
  const { b: base, l: limit, s: show } = yarg;

  let ouputMessage = '';
  const headerMessage = boxen(`Tabla del ${base}`, { padding: 1, width: 180, borderColor: 'green', textAlignment: 'center' });
  const ouputDir = path.join(__dirname, '../ouputs');

  for (let i = 1; i <= limit; i++) {
    ouputMessage += `${base} x ${i} = ${base * i}\n`;
  }

  ouputMessage = `${headerMessage}\n${ouputMessage}`;

  mkdirSync(ouputDir, { recursive: true });
  writeFileSync(`${ouputDir}/tabla-${base}.txt`, ouputMessage);

  if (show) console.log(ouputMessage);
  console.log('File created!');
}
