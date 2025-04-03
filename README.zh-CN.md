# gh-repo-export

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![javascript_code style][code-style-image]][code-style-url]

一个将GitHub用户的仓库信息导出为HTML和JSON文件的工具，按编程语言分类展示。

[English](./README.md)

## 功能特点

- 获取GitHub用户的所有公共仓库
- 按编程语言分类
- 自动同时导出JSON和HTML格式
- 生成美观的HTML页面展示仓库信息
- 支持命令行使用
- 可作为库导入到其他项目

## 安装

```bash
# 全局安装（推荐用于命令行使用）
npm install -g gh-repo-export

# 或者作为项目依赖安装
npm install gh-repo-export
```

## 命令行使用

```bash
# 导出指定用户的仓库信息（将生成 username-repos.json 和 username-repos.html）
gh-repo-export username

# 指定自定义输出文件基础名称（将生成 custom.json 和 custom.html）
gh-repo-export username custom
```

## 编程使用

### 同时导出JSON和HTML

```typescript
import { exportGithubRepoDataToJson, exportGithubRepos } from "gh-repo-export";

// 将用户的仓库数据导出为两种格式
async function exportUserData(username) {
  // 首先导出JSON
  const jsonPath = `${username}-repos.json`;
  await exportGithubRepoDataToJson(username, jsonPath);

  // 然后使用JSON数据导出HTML
  const htmlPath = `${username}-repos.html`;
  await exportGithubRepos(username, htmlPath, jsonPath);
}
```

### 仅导出HTML

```typescript
import { exportGithubRepos } from "gh-repo-export";

// 导出用户的仓库信息为HTML
await exportGithubRepos("username", "output.html");
```

### 仅导出JSON

```typescript
import { exportGithubRepoDataToJson } from "gh-repo-export";

// 导出用户的仓库信息为JSON
await exportGithubRepoDataToJson("username", "output.json");
```

### 获取结构化数据

```typescript
import { getGithubRepoData } from "gh-repo-export";

// 获取结构化的仓库数据
const data = await getGithubRepoData("username");
console.log(data.profile); // 用户信息
console.log(data.repos); // 所有仓库
console.log(data.languageGroups); // 按语言分组的仓库
```

### 使用底层API

```typescript
import {
  checkUser,
  generateHtml,
  getAllRepos,
  groupByLanguages
} from "gh-repo-export";

async function exportUser(username) {
  // 获取用户信息
  const profile = await checkUser(username);

  // 获取所有仓库
  const repos = await getAllRepos(username, profile.public_repos);

  // 按语言分组
  const groups = groupByLanguages(repos);

  // 获取结构化数据
  const data = { profile, repos, languageGroups: groups };

  // 生成HTML
  const html = generateHtml(data);

  // 现在可以使用生成的HTML
  console.log(html);
}
```

## License

[MIT](./LICENSE) License &copy; [Kirk Lin](https://github.com/kirklin)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/gh-repo-export?style=flat&colorA=080f12&colorB=3491fa
[npm-version-href]: https://npmjs.com/package/gh-repo-export
[npm-downloads-src]: https://img.shields.io/npm/dm/gh-repo-export?style=flat&colorA=080f12&colorB=3491fa
[npm-downloads-href]: https://npmjs.com/package/gh-repo-export
[bundle-src]: https://img.shields.io/bundlephobia/minzip/gh-repo-export?style=flat&colorA=080f12&colorB=3491fa&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=gh-repo-export
[license-src]: https://img.shields.io/github/license/kirklin/gh-repo-export.svg?style=flat&colorA=080f12&colorB=3491fa
[license-href]: https://github.com/kirklin/gh-repo-export/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=3491fa
[jsdocs-href]: https://www.jsdocs.io/package/gh-repo-export
[code-style-image]: https://img.shields.io/badge/code__style-%40kirklin%2Feslint--config-3491fa?style=flat&colorA=080f12&colorB=3491fa
[code-style-url]: https://github.com/kirklin/eslint-config/
