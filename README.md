To add a AI chatbot to the project, follow these steps:

1. In the `src/bots/` directory, copy the `TemplateBot.js` file and create a new file named `XXXXBot.js`.
2. In the `XXXXBot.js` file, implement the `_sendPrompt()` method. 
3. Add a reference to `XXXXBot.js` in the `src/App.vue` file.

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

Fine the `src/bots/index.js` file and modify the following code:

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
2. If the response only contains new incremental text, and you need to assemble all the text yourself, then call `onUpdateResponse(callbackParam, {content: text, done: false)};`. 
3. After receiving all the text, call `onUpdateResponse(callbackParam, {content: text, done: true)};` to update all the data. If the text has already been `onUpdateResponse` before, you can just call `onUpdateResponse(callbackParam, {done: true)};`. 
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
