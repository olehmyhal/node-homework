const { eventEmitter } = require("./eventEmitter");

function division(a, b) {
  eventEmitter.emit("message", a / b);
}

module.exports = { division };
