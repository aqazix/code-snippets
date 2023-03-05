const pino = require("pino");

class LoggerUtil {
  constructor() {
    this.logger = pino();
  }

  info(obj) {
    this.logger.info(obj);
  }

  error(obj) {
    this.logger.error(obj);
  }
}

const logger = new LoggerUtil();

module.exports = logger;
