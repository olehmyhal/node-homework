const { eventEmitter } = require("./eventEmitter");

function add(a, b) {
  eventEmitter.emit("message", a + b);
}

module.exports = { add };
