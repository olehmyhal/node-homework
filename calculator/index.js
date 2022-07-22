const { add } = require("./add");
const { division } = require("./division");
const { multiply } = require("./multiply");
const { subtraction } = require("./subtraction");
const { eventEmitter } = require("./eventEmitter");

function calculator() {
  const [_, _2, ...args] = process.argv;

  switch (args[1]) {
    case "+":
      add(+args[0], +[args[2]]);
      break;
    case "/":
      division(+args[0], +[args[2]]);
      break;
    case "*":
      multiply(+args[0], +[args[2]]);
      break;
    case "-":
      subtraction(+args[0], +[args[2]]);
      break;
    default:
      eventEmitter.emit("message", 0);
  }
}

calculator();
