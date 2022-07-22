const { eventEmitter } = require("./eventEmitter");

function subtraction(a, b) {
  eventEmitter.emit("message", a - b);
}

module.exports = { subtraction };
