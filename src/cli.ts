#!/usr/bin/env node

import process from "node:process";
import { exportGithubRepoDataToJson, exportGithubRepos } from "./index";

async function main() {
  const username = process.argv[2] || "kirklin";
  const format = process.argv[3] || "html";
  const outputPath = process.argv[4] || `${username}-repos.${format === "json" ? "json" : "html"}`;

  try {
    if (format === "json") {
      await exportGithubRepoDataToJson(username, outputPath);
    } else {
      await exportGithubRepos(username, outputPath);
    }
  } catch (error) {
    console.error(`CLI 错误: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main();
