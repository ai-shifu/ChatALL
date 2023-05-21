<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chat with ALL AI Bots Concurrently, Discover the Best</strong></p>

[Deutsch](README_DE-DE.md) | English | [简体中文](README_ZH-CN.md) | [日本語](README_JA-JP.md) | [Tiếng Việt](README_VI-VN.md) | [Français](README_FR-FR.md)

</div>

## Screenshots

![Screenshot](screenshots/screenshot-2.png?raw=true)
![Screenshot](screenshots/screenshot-1.png?raw=true)

## Features

Large Language Models (LLMs) based AI bots are amazing. However, their behavior can be random and different bots excel at different tasks. If you want the best experience, don't try them one by one. ChatALL (Chinese name: 齐叨) can send prompt to several AI bots concurrently, help you to discover the best results.

### Supported bots

| AI Bots                                                      | Web Access  | API         | Notes                                       |
| ------------------------------------------------------------ | ----------- | ----------- | ------------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | Yes         | Yes         | Web Browsing included                       |
| [Bing Chat](https://www.bing.com/new)                        | Yes         | No API      |                                             |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | No          | Yes         |                                             |
| [Bard](https://bard.google.com/)                             | Yes         | No API      |                                             |
| [Poe](https://poe.com/)                                      | Coming soon | Coming soon |                                             |
| [MOSS](https://moss.fastnlp.top/)                            | Yes         | No API      |                                             |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | Coming soon | Coming soon |                                             |
| [Dedao Learning Assistant](https://ai.dedao.cn/)             | Coming soon | No API      |                                             |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | Yes         | Coming soon |                                             |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | Yes         | No API      | No account or API key needed                |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | Yes         | No API      | No account or API key needed                |
| [ChatGLM](https://chatglm.cn/blog)                           | Yes         | No API      | No account or API key needed                |
| [Claude](https://www.anthropic.com/index/introducing-claude) | Yes         | No API      | No account or API key needed                |
| [Gradio](https://gradio.app/)                                | Yes         | No API      | For Hugging Face space/self-deployed models |
| [HuggingChat](https://huggingface.co/chat/)                  | Yes         | No API      |                                             |

And more...

### Other features

- Quick-prompt mode: send the next prompt without waiting for the previous request to complete
- Store chat history locally, protect your privacy
- Highlight the response you like, delete the bad
- Automatically keep ChatGPT session alive
- Enable/disable any bots at any time
- Switch between one, two, or three-column view
- Supports multiple languages (en, zh)
- [TODO] Best recommendations

## Prerequisites

ChatALL is a client, not a proxy. Therefore, you must:

1. Have working accounts and/or API tokens for the bots.
2. Have reliable network connections to the bots.
3. If you are using a VPN, it must be set as system/global proxy.

## Download / Install

Download from https://github.com/sunner/ChatALL/releases

### On Windows

Just download the \*-win.exe file and proceed with the setup.

### On macOS

For Apple Silicon Mac (M1, M2 CPU), download the \*-mac-arm64.dmg file.

For other Macs, download \*-mac-x64.dmg file.

### On Linux

Download the .AppImage file, make it executable, and enjoy the click-to-run experience.

## For developers

### Contribute a Bot

[The guide](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) may help you.

### Environment Dependents

Node.js must be v16.x

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

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Others

- GPT-4 contributed much of the code
- ChatGPT, Bing Chat and Google provide many solutions (ranked in order)
- Inspired by [ChatHub](https://github.com/chathub-dev/chathub). Respect!
