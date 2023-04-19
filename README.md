<div align="center">
   <img src="src/assets/logo-cover.png" width=128></img>
   <p><strong>Chat with ALL AI Bots Concurrently, Discover the Best</strong></p>
</div>

## Screenshots

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Features

Large Language Models (LLMs)-based AI bots are amazing. However, their behavior can be random and different bots excel at different tasks. If you want the best experience, don't try them one by one. ChatALL may help you to discover the best option.

### Supported bots

| AI Bots        | Web Access  | API         | Notes                                 |
|----------------|-------------|-------------|---------------------------------------|
| ChatGPT        | Yes         | Coming soon | Supports multiple models              |
| Bing Chat      | Yes         | No          | Chat with three styles concurrently   |
| Baidu ERNIE    | Coming soon | Coming soon | Who can hack its Web API?             |
| Bard           | Coming soon | No          |                                       |
| Claude         | Coming soon | Coming soon |                                       |
| Tongyi Qianwen | Coming soon | Coming soon | Who can provide an invitation?        |

And more...

### Other features

* Log in with your own bot accounts
* Enable/disable any bots at any time
* Switch between one, two, or three-column view
* Supports multiple languages (en, zh)
* [TODO] Keep ChatGPT session alive
* [TODO] Best recommendations

## Prerequisites

ChatALL is a client, not a proxy. Therefore, you must:

1. Have working accounts and/or API tokens for the bots.
2. Have reliable network connections to the bots.

## Download / Install

Download from https://github.com/sunner/ChatALL/releases

### macOS

After installation, run this command:

```bash
xattr -d com.apple.quarantine /Applications/ChatALL.app
```

## For developers

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

### Credits

* GPT-4 contributed much of the code
* ChatGPT, Bing Chat and Google provide many solutons (ranked in order)
* Inspired by [ChatHub](https://github.com/chathub-dev/chathub). Regards!
