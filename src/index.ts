import type { Repository as GitHubRepository, User as GitHubUser } from "./types/github";
import { writeFileSync } from "node:fs";
import axios from "axios";

interface Repository {
  name: string;
  language: string | null;
  description: string | null;
  link: string;
  isFork: boolean;
}

interface Profile {
  login: string;
  name: string | null;
  public_repos: number;
}

interface LanguageGroups {
  [key: string]: Repository[];
}

interface GithubRepoData {
  profile: Profile;
  repos: Repository[];
  languageGroups: LanguageGroups;
  // 添加完整的GitHub API数据
  rawData?: {
    user: GitHubUser;
    repositories: GitHubRepository[];
  };
}

// 简单的日志工具
const logger = {
  log: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(message);
  },
  error: (message: string): void => {
    console.error(message);
  },
};

/**
 * 获取GitHub用户信息
 * @param username GitHub用户名
 * @returns 用户信息
 */
export async function checkUser(username: string): Promise<GitHubUser> {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`获取用户信息失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 获取指定页码的仓库列表
 * @param username GitHub用户名
 * @param page 页码（从1开始）
 * @returns 仓库列表
 */
export async function getRepos(username: string, page: number): Promise<GitHubRepository[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`获取仓库列表失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 获取用户的所有仓库
 * @param username GitHub用户名
 * @param publicRepos 公共仓库数量
 * @returns 所有仓库列表
 */
export async function getAllRepos(username: string, publicRepos: number): Promise<GitHubRepository[]> {
  const pages = Math.ceil(publicRepos / 100);
  const allRepos: GitHubRepository[] = [];

  for (let page = 1; page <= pages; page++) {
    const repos = await getRepos(username, page);
    allRepos.push(...repos);
    // 添加延迟以避免触发GitHub API限制
    if (page < pages) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return allRepos;
}

/**
 * 将原始GitHub仓库数据转换为简化的仓库数据
 * @param rawRepos 原始仓库数据
 * @returns 简化的仓库数据
 */
export function simplifyRepoData(rawRepos: GitHubRepository[]): Repository[] {
  return rawRepos.map(item => ({
    name: item.name,
    language: item.language,
    description: item.description,
    link: `https://github.com/${item.full_name}`,
    isFork: item.fork,
  }));
}

/**
 * 将原始GitHub用户数据转换为简化的用户概要
 * @param rawUser 原始用户数据
 * @returns 简化的用户概要
 */
export function simplifyUserData(rawUser: GitHubUser): Profile {
  return {
    login: rawUser.login,
    name: rawUser.name,
    public_repos: rawUser.public_repos,
  };
}

/**
 * 按编程语言对仓库进行分组
 * @param repos 仓库列表
 * @returns 按语言分组的仓库
 */
export function groupByLanguages(repos: Repository[]): LanguageGroups {
  const languages: LanguageGroups = {};

  // 创建一个专门的Forks分类
  languages.Forks = [];

  for (const repo of repos) {
    // 如果是fork的仓库，添加到Forks分类
    if (repo.isFork) {
      languages.Forks.push(repo);
      continue; // 跳过后续处理
    }

    // 非fork仓库按语言分类
    const lang = repo.language ? repo.language : "Other";

    if (!languages[lang]) {
      languages[lang] = [];
    }

    languages[lang].push(repo);
  }

  // 如果没有fork的仓库，删除空的Forks分类
  if (languages.Forks.length === 0) {
    delete languages.Forks;
  }

  return languages;
}

/**
 * 获取完整的GitHub仓库数据结构
 * @param username GitHub用户名
 * @returns 结构化的GitHub仓库数据
 */
export async function getGithubRepoData(username: string): Promise<GithubRepoData> {
  const rawUser = await checkUser(username);
  const profile = simplifyUserData(rawUser);

  if (!profile.public_repos) {
    throw new Error("没有找到公共仓库或网络问题!");
  }

  const rawRepos = await getAllRepos(username, profile.public_repos);
  const repos = simplifyRepoData(rawRepos);
  const languageGroups = groupByLanguages(repos);

  return {
    profile,
    repos,
    languageGroups,
    rawData: {
      user: rawUser,
      repositories: rawRepos,
    },
  };
}

/**
 * 生成HTML输出
 * @param data 结构化的GitHub仓库数据
 * @returns HTML字符串
 */
export function generateHtml(data: GithubRepoData): string {
  const { profile, languageGroups } = data;
  const displayName = profile.name || profile.login;

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName} GitHub Repositories</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 { 
      border-bottom: 1px solid #eaecef;
      padding-bottom: 10px;
    }
    .language-group { 
      margin-bottom: 20px; 
    }
    .language-title {
      font-size: 1.4em;
      margin-bottom: 10px;
      padding: 5px 0;
      color: #24292e;
    }
    ul { 
      padding-left: 20px; 
    }
    li { 
      margin-bottom: 10px; 
    }
    a { 
      color: #0366d6;
      text-decoration: none;
      font-weight: 600;
    }
    a:hover { 
      text-decoration: underline; 
    }
    .description { 
      color: #586069;
    }
    .data-source {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #eaecef;
      color: #586069;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <h1>${displayName} GitHub Repositories</h1>
`;

  // 获取语言列表并排序，确保"Other"和"Forks"始终在最后
  const languages = Object.keys(languageGroups);
  const hasOther = languages.includes("Other");
  const hasForks = languages.includes("Forks");

  // 从列表中移除特殊类别
  const filteredLanguages = languages.filter(lang => lang !== "Other" && lang !== "Forks");

  // 按字母顺序对其他语言排序
  const sortedLanguages = filteredLanguages.sort();

  // 将特殊类别添加到末尾
  if (hasOther) {
    sortedLanguages.push("Other");
  }

  // 将Forks类别放在最后
  if (hasForks) {
    sortedLanguages.push("Forks");
  }

  for (const language of sortedLanguages) {
    const repos = languageGroups[language];
    // 特殊处理类别的标题
    const capitalizedLang = language === "Other"
      ? "# Other"
      : language === "Forks"
        ? "# Forks"
        : language.charAt(0).toUpperCase() + language.slice(1);

    html += `  <div class="language-group">
    <div class="language-title">${capitalizedLang}</div>
    <ul>
`;

    // 按仓库名称排序
    repos.sort((a, b) => a.name.localeCompare(b.name));

    for (const repo of repos) {
      html += `      <li>
        <a href="${repo.link}" title="${repo.name}">${repo.name}</a>
        ${repo.description ? `<span class="description">: ${repo.description}</span>` : ""}
      </li>
`;
    }

    html += `    </ul>
  </div>
`;
  }

  html += `  <div class="data-source">
    <p>数据来源: <a href="https://github.com/kirklin/gh-repo-export" target="_blank">github.com/kirklin/gh-repo-export</a></p>
  </div>
</body>
</html>`;

  return html;
}

/**
 * 导出用户的GitHub仓库数据为JSON文件
 * @param username GitHub用户名
 * @param outputPath 输出文件路径
 */
export async function exportGithubRepoDataToJson(username: string, outputPath: string = `${username}-repos.json`): Promise<GithubRepoData> {
  try {
    const data = await getGithubRepoData(username);
    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    logger.log(`成功导出 ${username} 的仓库数据到 ${outputPath}`);
    return data;
  } catch (error) {
    logger.error(`导出失败: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * 导出用户的GitHub仓库信息为HTML文件
 * @param username GitHub用户名
 * @param outputPath 输出文件路径
 * @param jsonPath JSON数据文件路径，如果提供，将直接使用该文件生成HTML
 */
export async function exportGithubRepos(username: string, outputPath: string = `${username}-repos.html`, jsonPath?: string): Promise<void> {
  try {
    let data: GithubRepoData;

    // 如果提供了JSON文件路径，尝试使用该文件
    if (jsonPath) {
      try {
        // 读取JSON文件内容并解析
        const fs = await import("node:fs");
        const jsonContent = fs.readFileSync(jsonPath, "utf-8");
        data = JSON.parse(jsonContent);
        logger.log(`从 ${jsonPath} 加载数据`);
      } catch (jsonError) {
        logger.error(`从JSON加载数据失败，将重新获取: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`);
        data = await getGithubRepoData(username);
      }
    } else {
      // 默认情况下，先导出JSON文件，再使用该数据生成HTML
      const jsonOutputPath = outputPath.replace(/\.html$/, ".json");
      data = await exportGithubRepoDataToJson(username, jsonOutputPath);
    }

    const html = generateHtml(data);
    writeFileSync(outputPath, html);
    logger.log(`成功导出 ${data.profile.login} 的仓库信息到 ${outputPath}`);
  } catch (error) {
    logger.error(`导出失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}
