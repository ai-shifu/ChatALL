import ClaudeAPIBot from "./ClaudeAPIBot";

export default class ClaudeAPIHaikuBot extends ClaudeAPIBot {
  static _className = "ClaudeAPIHaikuBot";
  static _logoFilename = "claudeapi-haiku-logo.png";
  static _model = "claude-3-haiku-20240307";
  constructor() {
    super();
  }
}
