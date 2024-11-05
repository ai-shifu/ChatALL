import ClaudeAPIBot from "./ClaudeAPIBot";

export default class ClaudeAPISonnetBot extends ClaudeAPIBot {
  static _className = "ClaudeAPISonnetBot";
  static _logoFilename = "claudeapi-sonnet-logo.png";
  static _model = "claude-3-5-sonnet-latest";
  constructor() {
    super();
  }
}
