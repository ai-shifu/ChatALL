import ClaudeAPIBot from "./ClaudeAPIBot";

export default class ClaudeAPIInstant12Bot extends ClaudeAPIBot {
  static _className = "ClaudeAPIInstant12Bot";
  static _logoFilename = "claude-logo.png";
  static _model = "claude-instant-1.2";
  constructor() {
    super();
  }
}
