import AtlasCloudAPIBot from "./AtlasCloudAPIBot";

export default class AtlasCloudQwen35FlashBot extends AtlasCloudAPIBot {
  static _className = "AtlasCloudQwen35FlashBot";
  static _model = "qwen/qwen3.5-flash";

  constructor() {
    super();
  }
}
