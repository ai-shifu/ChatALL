import GitHubAPIBot from "./GitHubAPIBot";

export default class GitHubAPIMistralLargeBot extends GitHubAPIBot {
  static _className = "GitHubAPIMistralLargeBot";
  static _model = "Mistral-large-2407";
  static _logoFilename = "mistral-large-github-logo.png";

  constructor() {
    super();
  }
}
