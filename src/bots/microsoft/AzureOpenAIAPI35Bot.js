import AzureOpenAIAPIBot from "./AzureOpenAIAPIBot";

export default class AzureOpenAIAPI35Bot extends AzureOpenAIAPIBot {
    static _className = "AzureOpenAIAPI35Bot";
    static _logoFilename = "openai-35-azure-logo.png";
    static _model = "gpt-3.5-turbo";

    constructor() {
      super();
    }

}