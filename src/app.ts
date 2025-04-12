import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';

(async () => {
  await main();
})();

async function main() {
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });

  const httpServer = createServer(server.app);
  WssService.initWss({ server: httpServer });

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running in port ${envs.PORT}`);
  });
}
