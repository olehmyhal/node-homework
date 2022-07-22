const perf_hook = require("perf_hooks");
const notifier = require("node-notifier");

const TIME_VARIABLES = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
};

const perfomanceObserver = new perf_hook.PerformanceObserver(
  (items, observer) => {
    const entry = items.getEntriesByName("res").pop();
    console.log(`${entry.name} ${entry.duration}`);

    observer.disconnect();
  }
);

perfomanceObserver.observe({ entryTypes: ["measure"] });

function main() {
  const [_1, _2, ...args] = process.argv;
  const time = args.reduce(
    (acc, val) =>
      acc +
      TIME_VARIABLES[val.split("").pop()] * val.substring(0, val.length - 1),
    0
  );
  performance.mark("start");
  notifier.notify("Timer started");
  setTimeout(() => {
    performance.mark("end");
    performance.measure("res", "start", "end");
    notifier.notify("Time out");
  }, time);
}

main();
