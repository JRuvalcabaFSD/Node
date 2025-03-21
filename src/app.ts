import { buildLogger } from './plugins';

const logger = buildLogger('app.ts');

logger.log('Holis');
logger.error('Esto esta mal');
