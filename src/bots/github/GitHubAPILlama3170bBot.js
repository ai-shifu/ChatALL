import GitHubAPIBot from "./GitHubAPIBot";

export default class GitHubAPILlama3170bBot extends GitHubAPIBot {
  static _className = "GitHubAPILlama3170bBot";
  static _model = "Meta-Llama-3.1-70B-Instruct";
  static _logoFilename = "llama-31-70b-github-logo.png";

  constructor() {
    super();
  }
}
