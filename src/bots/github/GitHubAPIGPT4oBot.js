import GitHubAPIBot from "./GitHubAPIBot";

export default class GitHubAPIGPT4oBot extends GitHubAPIBot {
  static _className = "GitHubAPIGPT4oBot";
  static _model = "gpt-4o";
  static _logoFilename = "openai-4o-github-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark

  constructor() {
    super();
  }
}
