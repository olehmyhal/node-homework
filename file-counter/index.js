const { performance, PerformanceObserver } = require("perf_hooks");
const { Worker } = require("worker_threads");

const perfomanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(`${item.name}: ${item.duration}`);
  });
});

perfomanceObserver.observe({ entryTypes: ["measure"] });

function main() {
  const [_, _2, ...args] = process.argv;

  const worker = new Worker("./worker.js", { workerData: { dir: args[0] } });

  worker.on("message", (msg) => {
    console.log(msg);
  });

  worker.on("error", (err) => {
    console.log("Smth went wrong", err);
  });
}

performance.mark("Start");
main();
performance.mark("End");
performance.measure("Result", "Start", "End");
