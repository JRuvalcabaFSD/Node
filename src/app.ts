import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { AppServer } from './presentation/server';

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_URL });
  const server = new AppServer({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
