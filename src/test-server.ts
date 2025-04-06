import { AppRoutes } from './presentation/routes';
import { envs } from './config/envs';
import { Server } from './presentation/server';

export const testServer = new Server({ port: envs.PORT, routes: AppRoutes.routes, public_path: envs.PUBLIC_PATH });
