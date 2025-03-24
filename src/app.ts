import { mainModule } from 'process';
import { Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
  Server.start();
}
