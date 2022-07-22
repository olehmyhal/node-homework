const { eventEmitter } = require("./eventEmitter");

function multiply(a, b) {
  eventEmitter.emit("message", a * b);
}

module.exports = { multiply };
