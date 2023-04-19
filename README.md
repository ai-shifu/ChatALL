<div align="center">
   <img src="src/assets/logo-cover.png" width=128></img>
   <p><strong>Chat with ALL AI Bots Cocurrently, Discover the Best</strong></p>
</div>

## Screenshots

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Features

The LLMs-based AI bots are amazing. But their behaviors are random and different bots are good at differt tasks. If you always want the best, don't try them one by one. ChatALL gives you the best one.

### Supported bots

| AI Bots     | Web Access  | API         | Notes                                 |
|-------------|-------------|-------------|---------------------------------------|
| ChatGPT     | Yes         | Coming soon | Supports multiple models              |
| Bing Chat   | Yes         | No          | Chat with three styles concurrently   |
| Baidu ERNIE | Coming soon | Coming soon | Who can hack its Web API?             |
| Bard        | Coming soon | No          |                                       |
| Claude      | Coming soon | Coming soon |                                       |
| Tongyi Qianwen | Coming soon | Coming soon | Who can provide invitation? |

And more...

### Other features

* Login the bots with your own accounts
* Turn on/off any bots at any time
* Switch to one, two or three columns view
* Supports multiply languages (en, zh)
* [TODO] Keep ChatGPT session alive
* [TODO] Best recommendations

## Download / install

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

Build for your all platform:
```bash
npm run electron:build -- -wml --x64 --arm64
```

### Credits

* GPT-4 wrote much code
* ChatGPT, Bing Chat and Google provide many solutons (ranked by order)
* Inspired by [ChatHub](https://github.com/chathub-dev/chathub). Regards!
