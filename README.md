# gh-repo-export

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![javascript_code style][code-style-image]][code-style-url]

A tool to export GitHub user's repository information as an HTML file, categorized by programming language.

[简体中文](./README.zh-CN.md)

## Features

- Fetch all public repositories of a GitHub user
- Categorize by programming language
- Support for exporting as structured JSON data or HTML format
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
# Export specified user's repository information as HTML (default output to username-repos.html)
gh-repo-export username

# Specify export format (html or json)
gh-repo-export username json

# Specify output file path
gh-repo-export username html output.html
gh-repo-export username json output.json
```

## Programmatic Usage

### Export as HTML

```typescript
import { exportGithubRepos } from "gh-repo-export";

// Export user's repository information as HTML
await exportGithubRepos("username", "output.html");
```

### Export as JSON

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
