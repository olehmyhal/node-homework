const fs = require("fs");
const { performance, PerformanceObserver } = require("perf_hooks");

const perfomanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(`${item.name}: ${item.duration}`);
  });
});

perfomanceObserver.observe({ entryTypes: ["measure"] });

const countFiles = (dir, prevPath = []) => {
  let count = 0;
  const fullPath =
    prevPath.reduce(
      (acc, el, index) => (acc += (index === 0 ? "" : "/") + el),
      ""
    ) +
    "/" +
    dir;

  if (fs.statSync(fullPath).isDirectory()) {
    const directories = fs.readdirSync(fullPath);
    if (!prevPath[dir]) {
      prevPath.push(dir);
    }
    directories.forEach(
      (el) => (count = count + countFiles(el, [...prevPath]))
    );
  } else {
    count = count + 1;
  }

  return count;
};

function main() {
  const [_, _2, ...args] = process.argv;
  //   console.log(fs.statSync(__dirname + "/index.js"));
  console.log(countFiles(args[0]));
}

performance.mark("Start");
main();
performance.mark("End");
performance.measure("Result", "Start", "End");
