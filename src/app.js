const buildLogger = require("./plugins/logger.plugin")

const logger = buildLogger("app.js")

logger.log("Hola Mundo")
logger.error("Esto es algo malo")