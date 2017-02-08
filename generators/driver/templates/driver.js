'use strict';

module.exports.init = function (devices_data, callback) {

  // when the driver starts, Homey rebooted. Initialise all previously paired devices.
  devices_data.forEach(function (device_data) {
    // do something here to initialise the device, e.g. start a socket connection
  })

  // let Homey know the driver is ready
  callback();
};

module.exports.capabilities = {};
