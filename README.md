# gh-repo-export

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![javascript_code style][code-style-image]][code-style-url]

A tool to export GitHub user's repository information as HTML and JSON files, categorized by programming language.

[简体中文](./README.zh-CN.md)

## Features

- Fetch all public repositories of a GitHub user
- Categorize by programming language
- Automatically export both JSON and HTML formats
- Generate beautiful HTML pages displaying repository information
- Command-line support
- Can be imported as a library into other projects

## Installation

```bash
# Global installation (recommended for command-line usage)
npm install -g gh-repo-export

# Or as a project dependency
npm install gh-repo-export
```

## Command-line Usage

```bash
# Export specified user's repository information (outputs username-repos.json and username-repos.html)
gh-repo-export username

# Specify custom output file base name (will generate custom.json and custom.html)
gh-repo-export username custom
```

## Programmatic Usage

### Export Both JSON and HTML

```typescript
import { exportGithubRepoDataToJson, exportGithubRepos } from "gh-repo-export";

// Export user's repository data to both formats
async function exportUserData(username) {
  // First export JSON
  const jsonPath = `${username}-repos.json`;
  await exportGithubRepoDataToJson(username, jsonPath);

  // Then export HTML using the JSON data
  const htmlPath = `${username}-repos.html`;
  await exportGithubRepos(username, htmlPath, jsonPath);
}
```

### Export Only HTML

```typescript
import { exportGithubRepos } from "gh-repo-export";

// Export user's repository information as HTML
await exportGithubRepos("username", "output.html");
```

### Export Only JSON

```typescript
import { exportGithubRepoDataToJson } from "gh-repo-export";

// Export user's repository information as JSON
await exportGithubRepoDataToJson("username", "output.json");
```

### Get Structured Data

```typescript
import { getGithubRepoData } from "gh-repo-export";

// Get structured repository data
const data = await getGithubRepoData("username");
console.log(data.profile); // User information
console.log(data.repos); // All repositories
console.log(data.languageGroups); // Repositories grouped by language
```

### Using Lower-level API

```typescript
import {
  checkUser,
  generateHtml,
  getAllRepos,
  groupByLanguages
} from "gh-repo-export";

async function exportUser(username) {
  // Get user information
  const profile = await checkUser(username);

  // Get all repositories
  const repos = await getAllRepos(username, profile.public_repos);

  // Group by language
  const groups = groupByLanguages(repos);

  // Get structured data
  const data = { profile, repos, languageGroups: groups };

  // Generate HTML
  const html = generateHtml(data);

  // Now you can use the generated HTML
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
