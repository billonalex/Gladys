const Bottleneck = require('bottleneck/es5');
const { init } = require('./init');
const { send } = require('./send');
const { listen } = require('./listen');
const { setup } = require('./setup');
const { setValue } = require('./device.setValue');
const { configure } = require('./device.configure');

// we rate-limit the number of request per seconds to control lights
const setValueLimiter = new Bottleneck({
  minTime: 400, // 400 ms
});

const ArduinoManager = function ArduinoManager(gladys, serviceId) {
  this.SerialPort = require('serialport');
  this.Readline = require('@serialport/parser-readline');
  this.Avrgirl = require('avrgirl-arduino');
  this.gladys = gladys;
  this.serviceId = serviceId;
  this.arduinosPorts = {};
  this.arduinoParsers = {};
};

ArduinoManager.prototype.init = init;
ArduinoManager.prototype.send = send;
ArduinoManager.prototype.listen = listen;
ArduinoManager.prototype.setup = setup;
ArduinoManager.prototype.configure = configure;
ArduinoManager.prototype.setValue = setValueLimiter.wrap(setValue);

module.exports = ArduinoManager;
