const path = require('path');
const { getDeviceParam } = require('../../../utils/device');

/**
 * @description Setup the Arduino and copy the code in it.
 * @param {Object} device - The Arduino device.
 * @returns {Promise} - .
 * @example
 * setup(device);
 */
async function setup(device) {
  try {
    const arduinoPath = getDeviceParam(device, 'ARDUINO_PATH');
    const model = getDeviceParam(device, 'ARDUINO_MODEL');

    const avrgirl = new this.Avrgirl({
      board: model,
      path: arduinoPath,
    });

    avrgirl.flash(path.resolve(`services/arduino/arduino-code/`, `${model}/arduino-code.ino.hex`), (error) => {
      if (error) {
        return new Error(error);
      }
      return null;
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

module.exports = {
  setup,
};
