# Contributing to ChatALL

Thank you for considering contributing to ChatALL! We welcome contributions from everyone, regardless of your background or experience level. Your contributions help make this project better for everyone.

## Introduction

ChatALL is a project that allows users to chat with multiple AI bots concurrently, helping them discover the best results. Our goal is to provide a seamless and efficient experience for users to interact with various AI bots.

## Reporting Issues

If you find any issues while using ChatALL, please follow these steps to report them:

1. **Check for existing issues**: Before reporting a new issue, please check the [issue tracker](https://github.com/ai-shifu/ChatALL/issues) to see if the issue has already been reported.
2. **Create a new issue**: If the issue has not been reported, create a new issue using the appropriate [issue template](https://github.com/ai-shifu/ChatALL/issues/new/choose).
3. **Provide detailed information**: Include as much information as possible, such as the steps to reproduce the issue, your operating system, and any relevant screenshots.

## Submitting Pull Requests

We welcome pull requests from everyone. To submit a pull request, follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.
2. **Create a new branch**: Create a new branch for your changes.
3. **Make your changes**: Make the necessary changes to the codebase.
4. **Commit your changes**: Commit your changes with a descriptive commit message.
5. **Push your changes**: Push your changes to your forked repository.
6. **Create a pull request**: Go to the original repository and click the "New pull request" button. Select your branch and provide a detailed description of your changes.

### Tips for Pull Requests

- **Control PR scope and size**:
  - Focus on a single feature or fix per PR
  - Break down large changes into smaller, independent PRs
  - Avoid mixing unrelated changes (e.g., refactoring + new feature)
  - Large PRs significantly slow down review process and increase merge conflicts
- **Best practices**:
  - Update i18n files for any user-facing text changes
  - Follow project coding standards

## Project Structure

Key directories:

- `src/bots/` - AI bot implementations
- `src/i18n/` - Localization files
- `src/components/` - Vue components
- `src/store/` - State management
- `public/bots/` - Bot logos

## Code Style Guidelines

To maintain a consistent codebase, please follow these code style guidelines:

- Use 2 spaces for indentation.
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Write clear and concise comments to explain your code.
- Follow the existing code style in the project.

## Encouraging Contributions

We believe that community involvement is crucial for the success of ChatALL. Here are some ways you can contribute:

- **Report issues**: If you encounter any issues, please report them using the [issue tracker](https://github.com/ai-shifu/ChatALL/issues).
- **Submit pull requests**: If you have a fix or improvement, please submit a pull request.
- **Suggest new features**: If you have an idea for a new feature, please create a new issue to discuss it with the community.
- **Improve documentation**: If you find any errors or omissions in the documentation, please submit a pull request to improve it.

## Resources for New Contributors

If you are new to contributing to open source projects, here are some resources to help you get started:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Timers Only](https://www.firsttimersonly.com/)
- [GitHub Docs](https://docs.github.com/en)

## Adding a New AI Bot

If you would like to add a new AI bot to ChatALL, please follow these steps:

1. **Create a new bot file**: In the `src/bots/` directory, create a new file for your bot. You can use the `TemplateBot.js` file as a starting point.
2. **Implement the `_sendPrompt()` method**: In your new bot file, implement the `_sendPrompt()` method to handle sending prompts to the AI bot.
3. **Add a reference to your bot**: In the `src/bots/index.js` file, add a reference to your new bot.
4. **Add translations**: Update all locale files in `src/i18n/`:

   ```json
   // filepath: src/i18n/locales/en.json
   {
     "yourBot": {
       "name": "Your Bot Name"
     }
   }
   ```

### Basic Bot Implementation Example

This is an example of using LangChainBot. Since LangChainBot uses LangChainJS, it is easy to integrate AI bots that are already supported by LangChainJS. For detailed steps, refer to the "Step-by-Step Guide to Adding a New AI Bot" section below. If you prefer not to use LangChain, you can directly extend the Bot class.

```javascript
// filepath: src/bots/KnowNothingBot.js
import LangChainBot from '@/bots/LangChainBot';

class KnowNothingBot extends LangChainBot {
  static _className = "KnowNothingBot";
  static _name = "Know Nothing Bot";
  static _description = "A bot that knows nothing";
  static _version = "1.0";

  constructor() {
    super();
  }

  async _sendPrompt(prompt) {
    try {
      // Implement your bot's logic here
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Required methods when extending LangChainBot
  _setupModel() {
    // Setup your LangChain model here
  }

  getPastRounds() {
    // Return the number of past conversation rounds to keep
    return 1;
  }
}

export default KnowNothingBot;
```

### Step-by-Step Guide to Adding a New AI Bot

1. **Create a New Bot File**: Navigate to the `src/bots/` directory and create a new file for your bot. For example, if your bot is named "KnowNothing", create `KnowNothingBot.js`.

   Basic Bot Implementation

   ```javascript
   import Bot from '@/bots/Bot';

   class KnowNothingBot extends Bot {
       static _className = "KnowNothingBot";
       static _name = "Know Nothing Bot";
       static _description = "A bot that knows nothing";
   }
   ```

   Or for LangChain-based Bot

   ```javascript
   import LangChainBot from '@/bots/LangChainBot';

   class KnowNothingBot extends LangChainBot {
       static _className = "KnowNothingBot";
       static _name = "Know Nothing Bot";
       static _description = "A bot that knows nothing";

       _setupModel() {
           // Setup your LangChain model here
       }

       getPastRounds() {
           return 1;
       }
   }
   ```

2. **Implement the `_sendPrompt()` Method**: Implement the `_sendPrompt()` method to handle sending prompts to the AI bot.

   ```javascript
   async _sendPrompt(prompt) {
       try {
           // Your code to send the prompt to the AI bot
           return response;
       } catch (error) {
           throw error;
       }
   }
   ```

3. **Add a Reference to Your Bot**: Add your bot to the `src/bots/index.js` file to ensure it is included in the application:

   ```javascript
   // First import your bot
   import KnowNothingBot from '@/bots/KnowNothingBot';

   // Add to the main bot list
   const all = [
     ChatGPT35Bot.getInstance(),
     ChatGPT4Bot.getInstance(),
     KnowNothingBot.getInstance(),  // Add your bot here
     ...existing_bots...
   ];

   // Add to appropriate category arrays
   export const botTags = {
     free: [
       bots.getBotByClassName("BardBot"),
       bots.getBotByClassName("KnowNothingBot"),  // If it's free
       ...existing_free_bots...
     ],
     openSource: [
       bots.getBotByClassName("AlpacaBot"),
       bots.getBotByClassName("KnowNothingBot"),  // If it's open source
       ...existing_opensource_bots...
     ],
     api: [
       bots.getBotByClassName("KnowNothingBot"),  // If it uses API
       bots.getBotByClassName("OpenAIAPI35Bot"),
       ...existing_api_bots...
     ],
     madeInChina: [
       bots.getBotByClassName("Qihoo360AIBrainBot"),
       bots.getBotByClassName("KnowNothingBot"),  // If it's made in China
       ...existing_china_bots...
     ],
   };

   // If needed, set custom user agent
   KnowNothingBot._userAgent = "THE_RIGHT_USER_AGENT";
   ```

4. **Customize User-Agent (if needed)**: Some websites may restrict access to specific browsers. Set the user-agent in `KnowNothingBot.js` if required.

   ```javascript
   static _userAgent = "THE_RIGHT_USER_AGENT";
   ```

5. **Test Your Bot**: Run the application and test your new bot to ensure it works correctly.

   ```bash
   npm run electron:serve
   ```

6. **Submit a Pull Request**: Once you have tested your bot and ensured it works correctly, submit a pull request following the steps mentioned in the "How to Submit Pull Requests" section.

Thank you for your contributions! We appreciate your efforts and look forward to your involvement in our community.

### Advanced Topics on Bot Development

#### UI order configuration

In the `src/bots/index.js` file, you can find the `all` array like

```javascript
// Add to the main bot list
const all = [
  ChatGPT35Bot.getInstance(),
  ChatGPT4Bot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  WenxinQianfanBot.getInstance(),
  SparkBot.getInstance(),
  MOSSBot.getInstance(),
  BardBot.getInstance(),
  ...existing_bots...
];
```

You can change the order of the bots in this array to control their display order in the UI.
For example, if you want to move the `BardBot` between `MOSSBot` and `WenxinQianfanBot`, you can modify the array like this:

```javascript
const all = [
  ChatGPT35Bot.getInstance(),
  ChatGPT4Bot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  MOSSBot.getInstance(),
  BardBot.getInstance(), // Moved BardBot here
  WenxinQianfanBot.getInstance(),
  SparkBot.getInstance(),
  ...existing_bots...
];
```

#### Setting component implementation

To fulfill other core functions, you need login functionality, API key configuration, etc. If your bot does not require login, or you don't mind putting the key directly in the code (strongly not recommended), you can skip this section.

##### Create a settings component

In the `src/components/BotSettings/` directory, create a new file named `KnowNothingBotSettings.vue`. 

You can use existing settings components as templates: 

1. If you only need login functionality, just copy `BardBotSettings.vue` and change import Bot from `@/bots/BardBot;` to import Bot from `@/bots/KnowNothingBot;`. 
   - (Note: Some websites have implemented security measures to prevent ChatALL and similar clients from accessing them. If you encounter such situations, you will need to do a lot of hack work.)
2. If you only need to configure the API key, copy `WenxinQianfanBotSettings.vue` and modify it, but this will require more work.
3. Complex setups with multiple configuration options require additional implementation steps.

##### Add settings field

ChatALL's settings UI is built using [Vuetify 3](https://vuetifyjs.com/). 
Refer to the [Vuetify 3 official documentation](https://vuetifyjs.com/en/introduction/why-vuetify/) to see and test the rich components it supports. 

By reviewing the existing implementation, you can adapt the code to suit your bot’s settings.

ChatALL's settings are stored in local storage using the [`vuex-persist`](https://github.com/championswimmer/vuex-persist). It's very handy, though the documentation is not readable enough. 
Here is a brief introduction on how to use it: 

First, in `src/store/index.js`, add the following code: 

```javascript
export default createStore({
  state: {
    ...
    knowNothing: {
      setting1: "",
      setting2: "",
    },
    ...
  },
  mutations: {
    ...
    setKnowNothing(state, { setting1, setting2 }) {
      state.knowNothing = { setting1, setting2 };
    },
    ...
  },
  ...
});
```

`setting1`, `setting2`, and sub-objects can be added, deleted, or modified as you like. Just make sure the top-level object is `knowNothing`, even if it only has one configuration. 

Then, in `KnowNothingBotSettings.vue`, add the following code: 

```javascript
export default {
  ...
  methods: {
    ...mapMutations(["setKnowNothing"]),
    setSetting1(value){
      this.setKnowNothing({
        ...this.knowNothing,
        setting1: value
      })
    },
    setSetting2(value){
      this.setKnowNothing({
        ...this.knowNothing,
        setting2: value
      })
    },
  },
  computed: {
    ...mapState(["knowNothing"])
  }
}
```

Finally, bind the `v-model` of the Vuetify component to the corresponding `knowNothing.xxx`, and point the action to the corresponding `setXxx()` function. For example: 

```html
<v-text-field
  v-model="knowNothing.setting1"
  @update:model-value="setSetting1"
></v-text-field>
```

Done! Run the program and open DevTools to check if the values are correctly stored in the "Application" tab. 

In `KnowNothingBot.js`, using the parameters you set is straightforward:

```javascript
...
import store from "@/store";
...
store.state.knowNothing.setting1
store.state.knowNothing.setting2
const { setting1, setting2 } = store.state.knowNothing;
...
```

#### Detailed _sendPrompt() patterns

This is the core function, which sends and receives messages. 

Reference existing bots depending on your interface type:

1. For standard HTTP APIs: see `BardBot.js`
2. For SSE-based APIs: see `ChatGPTBot.js`
3. For WebSocket APIs: see `BingChatBot.js` 

How you send and parse messages depends on the specific chatbot. Once you receive a response or hit an error, do the following: 

1. If the response only contains new incremental text, and you need to assemble all the text yourself, then call `onUpdateResponse(callbackParam, { content: text, done: false });`. 
2. After receiving all the text, call `onUpdateResponse(callbackParam, { content: text, done: true });` to update all the data. If the text has already been `onUpdateResponse` before, you can just call `onUpdateResponse(callbackParam, { done: true });`. 
3. When ending normally, call `resolve()`. 
4. If an error occurs, call `reject(error)`. The `error` can be an exception or an error message string. ChatALL will automatically handle it and display it to the user. 

#### checkAvailability() implementation

ChatALL calls the `checkAvailability()` function to check if the bot is available when it starts for the first time, refreshes the page (Command+R or Ctrl+R), and completes the settings. 

In general, it performs these checks:

1. Is the login valid?
2. Is the API key configured properly?
3. Are all the other necessary conditions met?

If everything is good, `checkAvailability()` should return `true`.
Else, it should return `false`.

#### Custom bot icons

Place the icon file in `public/bots/knownothing-logo.png`, and modify `KnowNothingBot.js`:

```javascript
static _logoFilename = "knownothing-logo.png";
```

#### Multi-language support in JS/HTML

Language files are located in `src/i18n/locales/`, named with language codes and in .json format. 
You need to add at least the following for your bot: 

`en.json`
```json
{
    ...
    "knowNothing": {
        "name": "Know Nothing"
    },
    ...
}
```

`zh.json`
```json
{
    ...
    "knowNothing": {
        "name": "啥都不懂"
    },
    ...
}
```

Plus any other strings your bot needs.

In JavaScript, you can use the following code to call the multi-language support:

```javascript
import i18n from "@/i18n";
...
i18n.global.t("knowNothing.name")
...
```

In HTML, you can use the following code:

```html
{{ $t("knowNothing.name") }}
```
