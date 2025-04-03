import { writeFileSync } from "node:fs";
import axios from "axios";

interface Repository {
  name: string;
  language: string | null;
  description: string | null;
  link: string;
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
export async function checkUser(username: string): Promise<Profile> {
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
export async function getRepos(username: string, page: number): Promise<Repository[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`;
  try {
    const response = await axios.get(url);
    const repos: Repository[] = response.data.map((item: any) => ({
      name: item.name,
      language: item.language,
      description: item.description,
      link: `https://github.com/${item.full_name}`,
    }));
    return repos;
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
export async function getAllRepos(username: string, publicRepos: number): Promise<Repository[]> {
  const pages = Math.ceil(publicRepos / 100);
  const allRepos: Repository[] = [];

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
 * 按编程语言对仓库进行分组
 * @param repos 仓库列表
 * @returns 按语言分组的仓库
 */
export function groupByLanguages(repos: Repository[]): LanguageGroups {
  const languages: LanguageGroups = {};

  for (const repo of repos) {
    const lang = repo.language ? repo.language : "Other";

    if (!languages[lang]) {
      languages[lang] = [];
    }

    languages[lang].push(repo);
  }

  return languages;
}

/**
 * 获取完整的GitHub仓库数据结构
 * @param username GitHub用户名
 * @returns 结构化的GitHub仓库数据
 */
export async function getGithubRepoData(username: string): Promise<GithubRepoData> {
  const profile = await checkUser(username);

  if (!profile.public_repos) {
    throw new Error("没有找到公共仓库或网络问题!");
  }

  const repos = await getAllRepos(username, profile.public_repos);
  const languageGroups = groupByLanguages(repos);

  return {
    profile,
    repos,
    languageGroups,
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
  </style>
</head>
<body>
  <h1>${displayName} GitHub Repositories</h1>
`;

  // 按字母顺序排序语言
  const sortedLanguages = Object.keys(languageGroups).sort();

  for (const language of sortedLanguages) {
    const repos = languageGroups[language];
    const capitalizedLang = language.charAt(0).toUpperCase() + language.slice(1);

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

  html += `</body>
</html>`;

  return html;
}

/**
 * 导出用户的GitHub仓库数据为JSON文件
 * @param username GitHub用户名
 * @param outputPath 输出文件路径
 */
export async function exportGithubRepoDataToJson(username: string, outputPath: string = `${username}-repos.json`): Promise<void> {
  try {
    const data = await getGithubRepoData(username);
    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    logger.log(`成功导出 ${username} 的仓库数据到 ${outputPath}`);
  } catch (error) {
    logger.error(`导出失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 导出用户的GitHub仓库信息为HTML文件
 * @param username GitHub用户名
 * @param outputPath 输出文件路径
 */
export async function exportGithubRepos(username: string, outputPath: string = `${username}-repos.html`): Promise<void> {
  try {
    const data = await getGithubRepoData(username);
    const html = generateHtml(data);
    writeFileSync(outputPath, html);
    logger.log(`成功导出 ${data.profile.login} 的仓库信息到 ${outputPath}`);
  } catch (error) {
    logger.error(`导出失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}
