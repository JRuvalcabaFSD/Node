const winston = require('winston');
const { combine,timestamp } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(winston.format.json(),timestamp()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));

module.exports = function buildLogger(service) {
  
  return {
    log: (message) => {
      logger.log("info",{message,service})
    },
    error: (message) => {
      logger.error({message,service})
    }
  }
}