[简体中文](README_ZH-CN.md)

<div align="center">
   <img src="src/assets/logo-cover.png" width=256></img>
   <p><strong>Chat with ALL AI Bots Concurrently, Discover the Best</strong></p>
</div>

## Screenshots

![Screenshot](screenshots/screenshot-2.png?raw=true)
![Screenshot](screenshots/screenshot-1.png?raw=true)

## Features

Large Language Models (LLMs) based AI bots are amazing. However, their behavior can be random and different bots excel at different tasks. If you want the best experience, don't try them one by one. ChatALL (Chinese name: 齐叨) can send prompt to severl AI bots concurrently, help you to discover the best results.

### Supported bots

| AI Bots                                      | Web Access     | API            |
|----------------------------------------------|----------------|----------------|
| [ChatGPT](https://chat.openai.com)            | Yes            | Yes            |
| [Bing Chat](https://www.bing.com/new)         | Yes            | No API         |
| [Baidu ERNIE](https://yiyan.baidu.com/)       | No             | Yes            |
| [Bard](https://bard.google.com/)              | Yes            | No API         |
| [Poe](https://poe.com/)                       | Coming soon    | Coming soon    |
| [MOSS](https://moss.fastnlp.top/)             | Yes            | No API         |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)   | Coming soon    | Coming soon    |
| [Dedao Learning Assistant](https://ai.dedao.cn/) | Coming soon | No API         |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)     | Yes            | Coming soon    |

And more...

### Other features

* Log in with your own AI bot accounts, or API token
* Automatically keep ChatGPT session alive
* Batch mode: You can send the next prompt without waiting for the previous request to complete
* Enable/disable any bots at any time
* Switch between one, two, or three-column view
* Supports multiple languages (en, zh)
* [TODO] Best recommendations

## Prerequisites

ChatALL is a client, not a proxy. Therefore, you must:

1. Have working accounts and/or API tokens for the bots.
2. Have reliable network connections to the bots.
3. If you are using a VPN, it must be set as system/global proxy.

## Download / Install

Download from https://github.com/sunner/ChatALL/releases

### On Windows

Just download the *-win-x64.exe (mostly) or *-win-arm64.exe file and proceed with the setup.

### On macOS

For Apple Silicon Mac (M1, M2 CPU), download the *-mac-arm64.dmg file.

For other Macs, download *-mac-x64.dmg file.

### On Linux

Download the .AppImage file, make it executable, and enjoy the click-to-run experience.

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
