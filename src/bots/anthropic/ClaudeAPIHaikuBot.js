import ClaudeAPIBot from "./ClaudeAPIBot";

export default class ClaudeAPIHaikuBot extends ClaudeAPIBot {
  static _className = "ClaudeAPIHaikuBot";
  static _logoFilename = "claudeapi-haiku-logo.png";
  static _model = "claude-3-5-haiku-latest";
  constructor() {
    super();
  }
}
