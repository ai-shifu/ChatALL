import ClaudeAPIBot from "./ClaudeAPIBot";

export default class ClaudeAPIOpusBot extends ClaudeAPIBot {
  static _className = "ClaudeAPIOpusBot";
  static _logoFilename = "claudeapi-opus-logo.png";
  static _model = "claude-3-opus-20240229";
  constructor() {
    super();
  }
}
