const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.once("message", (data) => {
  console.log(data);
});

module.exports = { eventEmitter };
