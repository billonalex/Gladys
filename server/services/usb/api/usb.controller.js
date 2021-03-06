const asyncMiddleware = require('../../../api/middlewares/asyncMiddleware');

module.exports = function UsbController({ list }) {
  /**
   * @api {get} /api/v1/service/usb/port List USB ports
   * @apiName getUsbPorts
   * @apiGroup Usb
   */
  async function getUsbPorts(req, res) {
    const ports = await list();

    res.json(
      ports.map(function(port) {
        return {
          comPath: port.path,
          comName: port.path,
          manufacturer: port.manufacturer,
          serialNumber: port.serialNumber,
          locationId: port.locationId,
          vendorId: port.vendorId,
          productId: port.productId,
        };
      }),
    );
  }

  return {
    'get /api/v1/service/usb/port': {
      authenticated: true,
      controller: asyncMiddleware(getUsbPorts),
    },
  };
};
