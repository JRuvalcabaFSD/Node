import boxen from 'boxen';
import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';

let ouputMessage = '';
const base = 5;
const headerMessage = boxen(`Tabla del ${base}`, { padding: 1, width: 180, borderColor: 'green', textAlignment: 'center' });
const ouputDir = path.join(__dirname, '../ouputs');

for (let i = 1; i <= 10; i++) {
  ouputMessage += `${base} x ${i} = ${base * i}\n`;
}

ouputMessage = `${headerMessage}\n${ouputMessage}`;

mkdirSync(ouputDir, { recursive: true });
writeFileSync(`${ouputDir}/tabla-${base}.txt`, ouputMessage);
console.log(ouputMessage);
