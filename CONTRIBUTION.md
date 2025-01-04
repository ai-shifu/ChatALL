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
