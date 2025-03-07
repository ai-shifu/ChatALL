import GitHubAPIBot from "./GitHubAPIBot";

export default class GitHubAPILlama318bBot extends GitHubAPIBot {
  static _className = "GitHubAPILlama318bBot";
  static _model = "Meta-Llama-3.1-8B-Instruct";
  static _logoFilename = "llama-31-8b-github-logo.png";

  constructor() {
    super();
  }
}
