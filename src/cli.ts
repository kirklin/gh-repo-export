#!/usr/bin/env node

import process from "node:process";
import { exportGithubRepos } from "./index";

async function main() {
  const username = process.argv[2] || "kirklin";
  const outputPath = process.argv[3] || `${username}-repos.html`;

  try {
    await exportGithubRepos(username, outputPath);
  } catch (error) {
    console.error(`CLI 错误: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main();
