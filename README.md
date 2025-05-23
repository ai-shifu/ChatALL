<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chat with ALL AI Bots Concurrently, Discover the Best</strong></p>

[Deutsch](README_DE-DE.md) | English | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ai-shifu/ChatALL)

</div>

## Screenshots

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Features

Large Language Models (LLMs) based AI bots are amazing. However, their behavior can be random and different bots excel at different tasks. If you want the best experience, don't try them one by one. ChatALL (Chinese name: 齐叨) can send prompt to several AI bots concurrently, help you to discover the best results. All you need to do is [download, install](https://github.com/ai-shifu/ChatALL/releases) and ask.

### Is this you?

Typical users of ChatALL are:

- 🤠**Gurus of LLMs**, who want to find the best answers or creations from LLMs.
- 🤓**Researchers of LLMs**, who want to intuitively compare the strengths and weaknesses of various LLMs in different fields.
- 😎**Developers of LLM applications**, who want to quickly debug prompts and find the best-performing foundation models.

### Supported bots

| AI Bots                                                                        | Web Access  | API         | Notes                                       |
| ------------------------------------------------------------------------------ | ----------- | ----------- | ------------------------------------------- |
| [360 AI Brain](https://ai.360.cn/)                                             | Yes         | No API      |                                             |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | No          | Yes         |                                             |
| [Character.AI](https://character.ai/)                                          | Yes         | No API      |                                             |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Yes         | No API      | No Login required                           |
| [ChatGPT](https://chatgpt.com)                                             | Yes         | Yes         | Web Browsing, Azure OpenAI service included |
| [Claude](https://www.anthropic.com/claude)                                     | Yes         | Yes         |                                             |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Yes         | No API      |                                             |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | No          | Yes         |                                             |
| [Cohere Command R Models](https://cohere.com/command)                          | No          | Yes         |                                             |
| [Copilot](https://copilot.microsoft.com/)                                      | Yes         | No API      |                                             |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Coming soon | No API      |                                             |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Yes         | No API      |                                             |
| [Gemini](https://gemini.google.com/)                                           | Yes         | Yes         |                                             |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Yes         | No API      |                                             |
| [Gradio](https://gradio.app/)                                                  | Yes         | No API      | For Hugging Face space/self-deployed models |
| [Groq Cloud](https://console.groq.com/docs/models)                             | No          | Yes         |                                             |
| [HuggingChat](https://huggingface.co/chat/)                                    | Yes         | No API      |                                             |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Yes         | Coming soon |                                             |
| [Kimi](https://kimi.moonshot.cn/               )                               | Yes         | No API      |                                             |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Yes         | No API      |                                             |
| [MOSS](https://moss.fastnlp.top/)                                              | Yes         | No API      |                                             |
| [Perplexity](https://www.perplexity.ai/)                                       | Yes         | No API      |                                             |
| [Phind](https://www.phind.com/)                                                | Yes         | No API      |                                             |
| [Pi](https://pi.ai)                                                            | Yes         | No API      |                                             |
| [Poe](https://poe.com/)                                                        | Yes         | Coming soon |                                             |
| [SkyWork](https://neice.tiangong.cn/)                                          | Yes         | Coming soon |                                             |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Yes         | Coming soon |                                             |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Yes         | No API      | No Login required                           |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Yes         | No API      |                                             |
| [xAI Grok](https://x.ai)                                                       | No          | Yes         |                                             |
| [YouChat](https://you.com/)                                                    | Yes         | No API      |                                             |
| [You](https://you.com/)                                                        | Yes         | No API      |                                             |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Yes         | No API      |                                             |

More is coming. Upvote your favorite bots in [these issues](https://github.com/ai-shifu/ChatALL/labels/more%20LLMs).

### Note on Web-connected Bot Reliability

Web-connected AI bots (those marked with "Web Access") are inherently less reliable and frequently face stability issues, as service providers regularly update their web interfaces and security measures. These web-based connections rely on reverse engineering and are difficult to maintain, often breaking unexpectedly. For a dependable experience, we strongly recommend using bots that offer API access whenever possible.

### Other features

- Quick-prompt mode: send the next prompt without waiting for the previous request to complete
- Save chat history locally, protect your privacy
- Highlight the response you like, delete the bad
- Enable/disable any bots at any time
- Switch between one, two, or three-column view
- Auto update to the latest version
- Dark mode (contributed by @tanchekwei)
- Short keys. Press <kbd>Ctrl</kbd> + <kbd>/</kbd> to know all of them (contributed by @tanchekwei)
- Multiple chats (contributed by @tanchekwei)
- Proxy setting (contributed by @msaong)
- Prompt management (contributed by @tanchekwei)
- Supports multiple languages (Chinese, English, German, French, Russian, Vietnamese, Korean, Japanese, Spanish, Italian)
- Supports Windows, macOS and Linux

Planned features:

You are welcome to contribute to these features.

- [ ] Deploy front-end to GitHub Pages

## Privacy

All chat history, settings and login data are saved locally on your computer.

ChatALL collects anonymous usage data to help us improve the product. Including:

- Which AI bots are prompted and how long the prompt is. Not including the prompt content.
- How long the response is, and which response is deleted/highlighted. Not including the response content.

## Prerequisites

ChatALL is a client, not a proxy. Therefore, you must:

1. Have working accounts and/or API tokens for the bots.
2. Have reliable network connections to the bots.

## Download / Install

Download from https://github.com/ai-shifu/ChatALL/releases

### On Windows

Just download the \*-win.exe file and proceed with the setup.

### On macOS

For Apple Silicon Mac (M1, M2 CPU), download the \*-mac-arm64.dmg file.

For other Macs, download \*-mac-x64.dmg file.

If you are using [Homebrew](https://brew.sh/), you can also install it with:

```bash
brew install --cask chatall
```

### On Linux

Debian-based Distributions: Download the .deb file, double click it and install the software.
Arch-based Distributions: You can clone ChatALL from the AUR [here](https://aur.archlinux.org/packages/chatall-bin). You can install it manually or using an AUR helper like yay or paru.
Other Distributions: Download the .AppImage file, make it executable, and enjoy the click-to-run experience. You can also use [AppimageLauncher](https://github.com/TheAssassin/AppImageLauncher).

## Troubleshooting

If you encounter any problems while using ChatALL, you can try the following methods to resolve them:

1. **Refresh** - press <kbd>Ctrl</kbd> + <kbd>R</kbd> or <kbd>⌘</kbd> + <kbd>R</kbd>.
2. **Restart** - exit ChatALL and run it again.
3. **Re-login** - click the settings button in the upper right corner, then click the corresponding login/logout link to relogin the website.
4. **Create a new chat** - click the `New Chat` button and send prompt again.

If none of the above methods work, you can try **resetting ChatALL**. Note that this will delete all your settings and message history.

You can reset ChatALL by deleting the following directories:

- Windows: `C:\Users\<user>\AppData\Roaming\chatall\`
- Linux: `/home/<user>/.config/chatall/`
- macOS: `/Users/<user>/Library/Application Support/chatall/`

If the problem persists, please [submit an issue](https://github.com/ai-shifu/ChatALL/issues).

## For developers

### Contribute a Bot

[The guide](https://github.com/ai-shifu/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) may help you.

### Run

```bash
npm install
npm run electron:serve
```

### Build

Build for your current platform:

```bash
npm run electron:build
```

Build for all platforms:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Credits

### Contributors

<a href="https://github.com/ai-shifu/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ai-shifu/ChatALL" />
</a>

### Others

- GPT-4 contributed much of the code
- ChatGPT, Copilot and Google provide many solutions (ranked in order)
- Inspired by [ChatHub](https://github.com/chathub-dev/chathub). Respect!

## Sponsor

If you like this project, please consider:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)


## To add a AI chatbot to the project, follow these steps:

1. In the `src/bots/` directory, copy the `TemplateBot.js` file and create a new file named `XXXXBot.js`.
2. In the `XXXXBot.js` file, implement the `_sendPrompt()` method. 
3. Add a reference to `XXXXBot.js` in the `src/bots/index.js` file.

Below are the detailed steps. Assumed that you have already cloned the latest code. 

## Hello world!

If you want to support a new AI model called "KnowNothing", you can quickly set up a basic program like Hello world by following these steps.

### Step 1: Create a JS file using the template

In the `src/bots/` directory, copy the `TemplateBot.js` file and create a new file named `KnowNothingBot.js`. 

### Step 2: Modify the JS file

Modify the class name and the initial values of the first two member variables in `KnowNothingBot.js` as follows:

```JavaScript
export default class KnowNothingBot extends Bot {
  static _brandId = "KnowNothing"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "KnowNothingBot"; // Class name of the bot
  ...
```

### Step 3: Make the code take effect

Find the `src/bots/index.js` file and modify the following code:

```JavaScript
// Bots
import ChatGPT35Bot from "@/bots/openai/ChatGPT35Bot";
import ChatGPT4Bot from "@/bots/openai/ChatGPT4Bot";
import ChatGPTBrowsingBot from "@/bots/openai/ChatGPTBrowsingBot";
import BingChatPreciseBot from "@/bots/microsoft/BingChatPreciseBot";
import BingChatBalancedBot from "@/bots/microsoft/BingChatBalancedBot";
import BingChatCreativeBot from "@/bots/microsoft/BingChatCreativeBot";
import SparkBot from "@/bots/SparkBot";
import BardBot from "@/bots/BardBot";
import OpenAIAPI35Bot from "@/bots/openai/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "@/bots/openai/OpenAIAPI4Bot";
import MOSSBot from "@/bots/MOSSBot";
```

Add the following line at any position:

```JavaScript
import KnowNothingBot from "@/bots/KnowNothingBot";
```

Then, in the same file, locate the `const all = [...]` array like this:

```JavaScript
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
],
```

Insert your bot to the array. 
The order of the bots in the array will be the order in which their icons are displayed in the UI. 
\
For example, if you want to add the "KnowNothing" bot between the "ChatGPT" and "Bing Chat" bots, you can do it like this:

```JavaScript
const all = [
  ChatGPT35Bot.getInstance(),
  ChatGPT4Bot.getInstance(),
  KnowNothingBot.getInstance(),  // You are here
  OpenAIAPI35Bot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  ...
],
```

### Step 4: Run the program

In the root directory of the project, run the following command to start the program:

```bash
npm install
npm run electron:serve
```

You should see the new bot in the icon bar, right? Select it and send a message to test it out!

## Add a settings component

To fulfill other core functions, you need login functionality, API key configuration, etc.
If your bot does not require login or you don't mind putting the key directly in the code (strongly not recommended), you can skip this section.

### Create a settings component

In the `src/components/BotSettings/` directory, create a new file named `KnowNothingBotSettings.vue`. 
\
You can use existing settings components as templates: 

1. If you only need login functionality, just copy `BardBotSettings.vue` and change import Bot from `@/bots/BardBot;` to import Bot from `@/bots/KnowNothingBot;`. 
   - (Note: Some websites have implemented security measures to prevent ChatALL and similar clients from accessing them. If you encounter such situations, you will need to do a lot of hack work.)
2. If you only need to configure the API key, copy `WenxinQianfanBotSettings.vue` and modify it, but this will require more work.
3. For complex settings with multiple configurations, you will need to do even more work. 

### Add settings field

ChatALL's settings UI is built using [Vuetify 3](https://vuetifyjs.com/). 
Refer to the [Vuetify 3 official documentation](https://vuetifyjs.com/en/introduction/why-vuetify/) to see and test the rich components it supports. 
\
By referring to the existing code, you can basically get everything workin. No need for further explanation here.

ChatALL's settings are stored in local storage using the [`vuex-persist`](https://github.com/championswimmer/vuex-persist). It's very handy, though the documentation is not readable enough. 
Here is a brief introduction on how to use it: 

First, in `src/store/index.js`, add the following code: 

```JavaScript
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

```JavaScript
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

```HTML
<v-text-field
  v-model="knowNothing.setting1"
  @change="setSetting1($event.target.value)"
></v-text-field>
```

Done! Run the program and open DevTools to check if the values are correctly stored in the "Application" tab. 

In `KnowNothingBot.js`, using the parameters you set is very simple:

```JavaScript
...
import store from "@/store";
...
store.state.knowNothing.setting1
store.state.knowNothing.setting2
const { setting1, setting2 } = store.state.knowNothing;
...
```

## Implement the core functions

### Implement `checkAvailability()`

ChatALL calls the `checkAvailability()` function to check if the bot is available when it starts for the first time, refreshes the page (Command+R or Ctrl+R), and completes the settings. 

In general, it performs these checks:

1. Is the login valid?
2. Is the API key configured properly?
3. Are all the other necessary conditions met?

If everything is good, it should execute:

```JavaScript
this.constructor._isAvailable = true;
```

Otherwise, it should execute:

```JavaScript
this.constructor._isAvailable = false;
```

Finally, always do:

```JavaScript
return this.isAvailable();
```

### Implement `_sendPrompt()`

This is the core function, which sends and receives messages. 

Reference existing bots depending on your interface type:

1. For standard HTTP APIs: see `BardBot.js`
2. For SSE-based APIs: see `ChatGPTBot.js`
3. For WebSocket APIs: see `BingChatBot.js` 

How you send and parse messages depends on the specific chatbot. Once you receive a response or hit an error, do the following: 

1. When receiving partial text, call `onUpdateResponse(callbackParam, {});`. 
2. If the response only contains new incremental text, and you need to assemble all the text yourself, then call `onUpdateResponse(callbackParam, {content: text, done: false});`. 
3. After receiving all the text, call `onUpdateResponse(callbackParam, {content: text, done: true});` to update all the data. If the text has already been `onUpdateResponse` before, you can just call `onUpdateResponse(callbackParam, {done: true});`. 
4. When ending normally, call `resolve()`. 
5. If an error occurs, call `reject(error)`. The `error` can be an exception or an error message string. ChatALL will automatically handle it and display it to the user. 

### Implement `createConversation()`

ChatALL plans to support chat history and multiple chat/thread/session/conversation (whatever you want to call it) in the future. 
\
Implementing `createConversation()` is mainly for future compatibility, and you can skip it for now. 

So, let's skip this part...

## Others

### Custom icon

Place the icon file in `src/assets/bots/knownothing-logo.png`, and modify `KnowNothingBot.js`:

```JavaScript
static _logoFilename = "knownothing-logo.png";
```

### Multi-language support

Language files are located in `src/i18n/locales/`, named with language codes and in .json format. 
You need to add at least the following for your bot: 

`en.json`
```json
    "knowNothing": {
        "name": "Know Nothing"
    },
```

`zh.json`
```json
    "knowNothing": {
        "name": "啥都不懂"
    },
```

Plus any other strings your bot need.

In JavaScript, you can use the following code to call the multi-language support:

```JavaScript
import i18n from "@/i18n";
...
i18n.global.t("knowNothing.stringName")
...
```

In HTML, you can use the following code:

```HTML
{{ $t("knowNothing.stringName") }}
```

### Customize user-agent

Some websites restrict access to specific browsers, so you need to set the user agent in `KnowNothingBot.js`:

```JavaScript
static _userAgent = "THE_RIGHT_USER_AGENT";
```

## Finally

That's it! 
PRs are welcome! 
