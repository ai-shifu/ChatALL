# Developing Bots for ChatALL

## Quick Start

See [Adding a new AI bot](../CONTRIBUTION.md#adding-a-new-ai-bot) in `CONTRIBUTION.md`.

## Advanced Topics  

### UI order configuration

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

### Setting component implementation

To fulfill other core functions, you need login functionality, API key configuration, etc. If your bot does not require login, or you don't mind putting the key directly in the code (strongly not recommended), you can skip this section.

#### Create a settings component


In the `src/components/BotSettings/` directory, create a new file named `KnowNothingBotSettings.vue`. 

You can use existing settings components as templates: 

1. If you only need login functionality, just copy `BardBotSettings.vue` and change import Bot from `@/bots/BardBot;` to import Bot from `@/bots/KnowNothingBot;`. 
   - (Note: Some websites have implemented security measures to prevent ChatALL and similar clients from accessing them. If you encounter such situations, you will need to do a lot of hack work.)
2. If you only need to configure the API key, copy `WenxinQianfanBotSettings.vue` and modify it, but this will require more work.
3. Complex setups with multiple configuration options require additional implementation steps.

#### Add settings field

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

### Detailed _sendPrompt() patterns

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

### checkAvailability() implementation

ChatALL calls the `checkAvailability()` function to check if the bot is available when it starts for the first time, refreshes the page (Command+R or Ctrl+R), and completes the settings. 

In general, it performs these checks:

1. Is the login valid?
2. Is the API key configured properly?
3. Are all the other necessary conditions met?

If everything is good, it should execute:

```javascript
this.constructor._isAvailable = true;
```

Otherwise, it should execute:

```javascript
this.constructor._isAvailable = false;
```

Finally, always do:

```javascript
return this.isAvailable();
```

### Custom bot icons

Place the icon file in `src/assets/bots/knownothing-logo.png`, and modify `KnowNothingBot.js`:

```javascript
static _logoFilename = "knownothing-logo.png";
```

### Multi-language support in JS/HTML

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
i18n.global.t("knowNothing.stringName")
...
```

In HTML, you can use the following code:

```html
{{ $t("knowNothing.stringName") }}
```
