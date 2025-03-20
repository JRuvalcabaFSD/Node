import { buildLogger } from './plugins';

const logger = buildLogger('app.ts');
logger.log('Hola mundo');
logger.error('Esto es algo malo');
