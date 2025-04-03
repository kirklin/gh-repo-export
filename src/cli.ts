#!/usr/bin/env node

import process from "node:process";
import { exportGithubRepoDataToJson, exportGithubRepos } from "./index";

async function main() {
  const username = process.argv[2] || "kirklin";
  const outputBaseName = process.argv[3] || `${username}-repos`;
  const jsonOutputPath = `${outputBaseName}.json`;
  const htmlOutputPath = `${outputBaseName}.html`;

  try {
    // 首先导出JSON数据
    await exportGithubRepoDataToJson(username, jsonOutputPath);
    // 然后使用JSON数据导出HTML
    await exportGithubRepos(username, htmlOutputPath, jsonOutputPath);
    console.log(`成功导出 ${username} 的仓库数据（JSON和HTML格式）`);
  } catch (error) {
    console.error(`CLI 错误: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main();
