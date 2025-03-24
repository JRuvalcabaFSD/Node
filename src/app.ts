import { mainModule } from 'process';
import { Server } from './presentation/server';
import { FileSystemDatasource } from './infrastructure/datasources/file-system.datasource';

(async () => {
  main();
})();

function main() {
  Server.start();
}
