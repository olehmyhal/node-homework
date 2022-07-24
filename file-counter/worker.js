const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");

const countFiles = ({ dir, prevPath = [] }) => {
  let count = 0;

  const fullPath =
    prevPath.reduce(
      (acc, el, index) => (acc += (index === 0 ? "" : "/") + el),
      ""
    ) +
    (prevPath.length === 0 ? "" : "/") +
    dir;

  if (fs.statSync(fullPath).isDirectory()) {
    const directories = fs.readdirSync(fullPath);
    if (!prevPath[dir]) {
      prevPath.push(dir);
    }
    directories.forEach(
      (el) => (count = count + countFiles({ dir: el, prevPath: [...prevPath] }))
    );
  } else {
    count = count + 1;
  }

  return count;
};

parentPort.postMessage(countFiles(workerData));
