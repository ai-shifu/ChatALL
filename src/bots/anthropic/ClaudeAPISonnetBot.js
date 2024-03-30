import ClaudeAPIBot from "./ClaudeAPIBot";

export default class ClaudeAPISonnetBot extends ClaudeAPIBot {
  static _className = "ClaudeAPISonnetBot";
  static _logoFilename = "claudeapi-sonnet-logo.png";
  static _model = "claude-3-sonnet-20240229";
  constructor() {
    super();
  }
}
