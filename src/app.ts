import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
(() => {
  main();
})();

function main() {
  const { PORT, PUBLIC_PATH } = envs;
  const server = new Server({ port: PORT, public_path: PUBLIC_PATH, routes: AppRoutes.routes });
  server.start();
}
