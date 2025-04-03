/**
 * GitHub 仓库所有者接口
 * GitHub Repository Owner Interface
 */
export interface Owner {
  /** 用户登录名 / User login name */
  login: string;
  /** 用户ID / User ID */
  id: number;
  /** 用户节点ID / User node ID */
  node_id: string;
  /** 用户头像URL / User avatar URL */
  avatar_url: string;
  /** Gravatar ID / Gravatar ID */
  gravatar_id: string;
  /** 用户API URL / User API URL */
  url: string;
  /** 用户HTML URL / User HTML URL */
  html_url: string;
  /** 关注者API URL / Followers API URL */
  followers_url: string;
  /** 关注API URL模板 / Following API URL template */
  following_url: string;
  /** Gists API URL模板 / Gists API URL template */
  gists_url: string;
  /** 星标API URL模板 / Starred API URL template */
  starred_url: string;
  /** 订阅API URL / Subscriptions API URL */
  subscriptions_url: string;
  /** 组织API URL / Organizations API URL */
  organizations_url: string;
  /** 仓库API URL / Repositories API URL */
  repos_url: string;
  /** 事件API URL模板 / Events API URL template */
  events_url: string;
  /** 接收事件API URL / Received events API URL */
  received_events_url: string;
  /** 用户类型 / User type */
  type: string;
  /** 用户视图类型 / User view type */
  user_view_type: string;
  /** 是否为站点管理员 / Whether the user is a site admin */
  site_admin: boolean;
}

/**
 * GitHub 许可证接口
 * GitHub License Interface
 */
export interface License {
  /** 许可证键名 / License key */
  key: string;
  /** 许可证名称 / License name */
  name: string;
  /** SPDX ID / SPDX ID */
  spdx_id: string;
  /** 许可证URL / License URL */
  url: string;
  /** 节点ID / Node ID */
  node_id: string;
}

/**
 * GitHub 仓库接口
 * GitHub Repository Interface
 */
export interface Repository {
  /** 仓库ID / Repository ID */
  id: number;
  /** 节点ID / Node ID */
  node_id: string;
  /** 仓库名称 / Repository name */
  name: string;
  /** 仓库完整名称 / Repository full name */
  full_name: string;
  /** 是否为私有仓库 / Whether the repository is private */
  private: boolean;
  /** 仓库所有者 / Repository owner */
  owner: Owner;
  /** 仓库HTML URL / Repository HTML URL */
  html_url: string;
  /** 仓库描述 / Repository description */
  description: string;
  /** 是否为复刻 / Whether the repository is a fork */
  fork: boolean;
  /** 仓库API URL / Repository API URL */
  url: string;
  /** 复刻API URL / Forks API URL */
  forks_url: string;
  /** 密钥API URL模板 / Keys API URL template */
  keys_url: string;
  /** 协作者API URL模板 / Collaborators API URL template */
  collaborators_url: string;
  /** 团队API URL / Teams API URL */
  teams_url: string;
  /** Hooks API URL / Hooks API URL */
  hooks_url: string;
  /** 议题事件API URL模板 / Issue events API URL template */
  issue_events_url: string;
  /** 事件API URL / Events API URL */
  events_url: string;
  /** 受托人API URL模板 / Assignees API URL template */
  assignees_url: string;
  /** 分支API URL模板 / Branches API URL template */
  branches_url: string;
  /** 标签API URL / Tags API URL */
  tags_url: string;
  /** Blobs API URL模板 / Blobs API URL template */
  blobs_url: string;
  /** Git标签API URL模板 / Git tags API URL template */
  git_tags_url: string;
  /** Git引用API URL模板 / Git refs API URL template */
  git_refs_url: string;
  /** 树API URL模板 / Trees API URL template */
  trees_url: string;
  /** 状态API URL模板 / Statuses API URL template */
  statuses_url: string;
  /** 语言API URL / Languages API URL */
  languages_url: string;
  /** 星标者API URL / Stargazers API URL */
  stargazers_url: string;
  /** 贡献者API URL / Contributors API URL */
  contributors_url: string;
  /** 订阅者API URL / Subscribers API URL */
  subscribers_url: string;
  /** 订阅API URL / Subscription API URL */
  subscription_url: string;
  /** 提交API URL模板 / Commits API URL template */
  commits_url: string;
  /** Git提交API URL模板 / Git commits API URL template */
  git_commits_url: string;
  /** 评论API URL模板 / Comments API URL template */
  comments_url: string;
  /** 议题评论API URL模板 / Issue comments API URL template */
  issue_comment_url: string;
  /** 内容API URL模板 / Contents API URL template */
  contents_url: string;
  /** 比较API URL模板 / Compare API URL template */
  compare_url: string;
  /** 合并API URL / Merges API URL */
  merges_url: string;
  /** 归档API URL模板 / Archive API URL template */
  archive_url: string;
  /** 下载API URL / Downloads API URL */
  downloads_url: string;
  /** 议题API URL模板 / Issues API URL template */
  issues_url: string;
  /** 拉取请求API URL模板 / Pull requests API URL template */
  pulls_url: string;
  /** 里程碑API URL模板 / Milestones API URL template */
  milestones_url: string;
  /** 通知API URL模板 / Notifications API URL template */
  notifications_url: string;
  /** 标签API URL模板 / Labels API URL template */
  labels_url: string;
  /** 发布API URL模板 / Releases API URL template */
  releases_url: string;
  /** 部署API URL / Deployments API URL */
  deployments_url: string;
  /** 创建时间 / Creation time */
  created_at: string;
  /** 更新时间 / Update time */
  updated_at: string;
  /** 推送时间 / Push time */
  pushed_at: string;
  /** Git URL / Git URL */
  git_url: string;
  /** SSH URL / SSH URL */
  ssh_url: string;
  /** 克隆URL / Clone URL */
  clone_url: string;
  /** SVN URL / SVN URL */
  svn_url: string;
  /** 主页 / Homepage */
  homepage: string;
  /** 仓库大小 / Repository size */
  size: number;
  /** 星标数 / Stargazers count */
  stargazers_count: number;
  /** 观察者数 / Watchers count */
  watchers_count: number;
  /** 主要编程语言 / Main language */
  language: string | null;
  /** 是否启用议题 / Whether issues are enabled */
  has_issues: boolean;
  /** 是否启用项目 / Whether projects are enabled */
  has_projects: boolean;
  /** 是否启用下载 / Whether downloads are enabled */
  has_downloads: boolean;
  /** 是否启用Wiki / Whether Wiki is enabled */
  has_wiki: boolean;
  /** 是否启用Pages / Whether Pages is enabled */
  has_pages: boolean;
  /** 是否启用讨论 / Whether discussions are enabled */
  has_discussions: boolean;
  /** 复刻数 / Forks count */
  forks_count: number;
  /** 镜像URL / Mirror URL */
  mirror_url: string | null;
  /** 是否归档 / Whether the repository is archived */
  archived: boolean;
  /** 是否禁用 / Whether the repository is disabled */
  disabled: boolean;
  /** 开放议题数 / Open issues count */
  open_issues_count: number;
  /** 许可证 / License */
  license: License | null;
  /** 是否允许复刻 / Whether forking is allowed */
  allow_forking: boolean;
  /** 是否为模板 / Whether the repository is a template */
  is_template: boolean;
  /** 是否要求Web提交签名 / Whether web commit sign-off is required */
  web_commit_signoff_required: boolean;
  /** 主题标签 / Topic tags */
  topics: string[];
  /** 可见性 / Visibility */
  visibility: string;
  /** 复刻数 / Forks count */
  forks: number;
  /** 开放议题数 / Open issues count */
  open_issues: number;
  /** 观察者数 / Watchers count */
  watchers: number;
  /** 默认分支 / Default branch */
  default_branch: string;
}

/**
 * GitHub 用户接口
 * GitHub User Interface
 */
export interface User {
  /** 用户登录名 / User login name */
  login: string;
  /** 用户ID / User ID */
  id: number;
  /** 用户节点ID / User node ID */
  node_id: string;
  /** 用户头像URL / User avatar URL */
  avatar_url: string;
  /** Gravatar ID / Gravatar ID */
  gravatar_id: string;
  /** 用户API URL / User API URL */
  url: string;
  /** 用户HTML URL / User HTML URL */
  html_url: string;
  /** 关注者API URL / Followers API URL */
  followers_url: string;
  /** 关注API URL模板 / Following API URL template */
  following_url: string;
  /** Gists API URL模板 / Gists API URL template */
  gists_url: string;
  /** 星标API URL模板 / Starred API URL template */
  starred_url: string;
  /** 订阅API URL / Subscriptions API URL */
  subscriptions_url: string;
  /** 组织API URL / Organizations API URL */
  organizations_url: string;
  /** 仓库API URL / Repositories API URL */
  repos_url: string;
  /** 事件API URL模板 / Events API URL template */
  events_url: string;
  /** 接收事件API URL / Received events API URL */
  received_events_url: string;
  /** 用户类型 / User type */
  type: string;
  /** 用户视图类型 / User view type */
  user_view_type: string;
  /** 是否为站点管理员 / Whether the user is a site admin */
  site_admin: boolean;
  /** 用户名称 / User name */
  name: string;
  /** 公司或组织 / Company or organization */
  company: string;
  /** 博客或网站 / Blog or website */
  blog: string;
  /** 所在地 / Location */
  location: string;
  /** 电子邮箱 / Email */
  email: string | null;
  /** 是否可雇佣 / Whether the user is hireable */
  hireable: boolean;
  /** 个人简介 / Bio */
  bio: string;
  /** Twitter用户名 / Twitter username */
  twitter_username: string;
  /** 公开仓库数量 / Public repositories count */
  public_repos: number;
  /** 公开Gist数量 / Public gists count */
  public_gists: number;
  /** 关注者数量 / Followers count */
  followers: number;
  /** 关注数量 / Following count */
  following: number;
  /** 创建时间 / Creation time */
  created_at: string;
  /** 更新时间 / Update time */
  updated_at: string;
}
