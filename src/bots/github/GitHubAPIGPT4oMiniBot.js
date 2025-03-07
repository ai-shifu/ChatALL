import GitHubAPIBot from "./GitHubAPIBot";

export default class GitHubAPIGPT4oMiniBot extends GitHubAPIBot {
  static _className = "GitHubAPIGPT4oMiniBot";
  static _model = "gpt-4o-mini";
  static _logoFilename = "openai-4o-mini-github-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark

  constructor() {
    super();
  }
}
