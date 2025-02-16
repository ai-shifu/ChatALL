import GitHubAPIBot from "./GitHubAPIBot";

export default class GitHubAPIMistralNemoBot extends GitHubAPIBot {
  static _className = "GitHubAPIMistralNemoBot";
  static _model = "Mistral-nemo";
  static _logoFilename = "mistral-nemo-github-logo.png";

  constructor() {
    super();
  }
}
