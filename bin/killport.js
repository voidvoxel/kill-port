#!/usr/bin/env node

const killPort = require("../src");

async function main(
  args
) {
  const port = args[0];

  try {
    await killPort(port);
  } catch (error) {
    console.error(error.message);

    process.exit(1);
  }
}

main.call({}, process.argv.slice(2));
