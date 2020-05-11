const logger = require('../../../utils/logger');
const SerialPort = require('serialport');

/**
 * @description Send a message to the Arduino
 * @param {Object} device - The Arduino device.
 * @example
 * send(device);
 */
async function send(device) {
  try {
    const path = device.params.findIndex((param) => param.name === 'ARDUINO_PATH');
    var message = 'test';

    const port = new SerialPort(path, function (err) {
      if (err) {
        return logger.warn('Error: ', err.message);
      }
    });

    port.write(message, function (err) {
      if (err) {
        return logger.warn('Error on write: ', err.message);
      }
      logger.warn('message written');
    })

  } catch (e) {
    logger.warn('Unable to send message');
    logger.debug(e);
  }
}

module.exports = {
  send,
};