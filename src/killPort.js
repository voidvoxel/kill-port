const { execSync } = require("child_process");

function removeElementsFromArray(
  array,
  valueToRemove
) {
  return array.filter(
    item => item !== valueToRemove
  );
}

async function killPort(
  port
) {
  port
    = !!port & (port <= 65535 && port >= 0)
    ? port
    : (
      () => {
        throw new Error(`Invalid port ${JSON.stringify(port)}.`);
      }
    )();

  let lsofOutput;

  try {
    lsofOutput = execSync("lsof -nPi tcp:" + port).toString("utf-8");
  } catch {
    throw new Error(`Port ${port} is not in use.`);
  }

  let portLine = lsofOutput.split("\n")[1];

  const processId = parseInt(removeElementsFromArray(portLine.split(" "), "")[1]);

  try {
    execSync(`kill ${processId}`);
  } catch {
    throw new Error(`Failed to kill the process currently using port ${port}.`);
  }
}

module.exports = killPort;
