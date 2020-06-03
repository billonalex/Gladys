const { fake } = require('sinon');
const EventEmitter = require('events');

const SerialPort = function SerialPort() {};

SerialPort.prototype = Object.create(new EventEmitter());

const ports = [
  {
    comName: '/dev/ttACM0',
    manufacturer: undefined,
    serialNumber: undefined,
    pnpId: undefined,
    locationId: undefined,
    vendorId: undefined,
    productId: undefined,
  },
];

SerialPort.list = () => {
  return new Promise((resolve, reject) => {
    resolve(ports);
  });
};

SerialPort.prototype.open = fake.resolves(null);
SerialPort.prototype.on = fake.resolves(null);

module.exports = SerialPort;