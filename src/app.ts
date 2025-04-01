import { Server } from './presentation/server';
(() => {
  main();
})();

function main() {
  const server = new Server();
  server.start();
}
