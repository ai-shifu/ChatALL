<div align="center">
   <img src="src/assets/logo-cover.png" width=256></img>
   <p><strong>Chatten Sie mit ALLEN AI-Bots gleichzeitig, entdecken Sie die Besten</strong></p>

Deutsch | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## Bilder

![Bilder](screenshots/screenshot-1.png?raw=true)

## Funktionen

Auf großen Sprachmodellen (LLMs) basierende KI-Bots sind erstaunlich. Ihr Verhalten kann jedoch willkürlich sein, und verschiedene Bots sind für unterschiedliche Aufgaben hervorragend geeignet. Wenn Sie die beste Erfahrung machen wollen, sollten Sie sie nicht einzeln ausprobieren. ChatALL (chinesischer Name: 齐叨) kann Anfragen an mehrere KI-Bots gleichzeitig senden und Ihnen so helfen, die besten Ergebnisse zu erzielen.

### Supported bots

| AI Bots                                                      | Web Zugang  | API         | Notizen                                      |
| ------------------------------------------------------------ | ----------- | ----------- | -------------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | Yes         | Yes         | Web-Browsing inklusive                       |
| [Bing Chat](https://www.bing.com/new)                        | Yes         | No API      | Kein Login erforderlich                      |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | No          | Yes         |                                              |
| [Bard](https://bard.google.com/)                             | Yes         | Coming soon |                                              |
| [Poe](https://poe.com/)                                      | Yes         | Coming soon |                                              |
| [MOSS](https://moss.fastnlp.top/)                            | Yes         | No API      |                                              |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | Yes         | Coming soon |                                              |
| [Dedao Learning Assistant](https://ai.dedao.cn/)             | Coming soon | No API      |                                              |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | Yes         | Coming soon |                                              |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | Yes         | No API      | Kein Login erforderlich                      |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | Yes         | No API      | Kein Login erforderlich                      |
| [ChatGLM](https://chatglm.cn/blog)                           | Yes         | No API      | Kein Login erforderlich                      |
| [Claude](https://www.anthropic.com/index/introducing-claude) | Yes         | No API      | Kein Login erforderlich                      |
| [Gradio](https://gradio.app/)                                | Yes         | No API      | Für Hugging Face space/self-deployed Modelle |
| [HuggingChat](https://huggingface.co/chat/)                  | Yes         | No API      |                                              |
| [QianWen](https://qianwen.aliyun.com/)                       | Yes         | Coming soon |                                              |

Und mehr...

### Unterstützte Bots

- Schneller Prompt-Modus: Senden Sie den nächsten Prompt, ohne auf das Ende der vorherigen Anfrage zu warten
- Lokale Speicherung des Chatverlaufs zum Schutz Ihrer Privatsphäre
- Markieren Sie die Antwort, die Ihnen gefällt, und löschen Sie die schlechte Antwort
- Automatische Aufrechterhaltung der ChatGPT-Sitzung
- Aktivieren/Deaktivieren von Bots zu jeder Zeit
- Umschalten zwischen ein-, zwei- oder dreispaltiger Ansicht
- Unterstützt mehrere Sprachen (en, zh)
- [TODO] Beste Empfehlungen

## Anforderungen

ChatALL ist ein Client, nicht ein Proxy. Daher müssen Sie:

1. funktionierende Konten und/oder API-Tokens für die Bots haben.
2. eine zuverlässige Netzwerkverbindung zu den Bots haben.
3. Wenn Sie ein VPN verwenden, muss es als System-/Globalproxy eingestellt sein.

## Download / Installation

Downloaden von https://github.com/sunner/ChatALL/releases

### Auf Windows

Laden Sie einfach die Datei \*-win.exe herunter und fahren Sie mit der Installation fort.

### Auf macOS

Für Apple Silicon Mac (M1, M2 CPU), laden Sie die Datei \*-mac-arm64.dmg herunter.

Für andere Macs, laden Sie die Datei \*-mac-x64.dmg herunter.

### Auf Linux

Laden Sie die .AppImage-Datei herunter, machen Sie sie ausführbar und genießen Sie das Click-to-Run-Erlebnis.

## Für Entwickler

### Einen Bot beisteuern

[Die Anleitung](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) hilft dir dabei.

### Ausführen

```bash
npm install
npm run electron:serve
```

### Builden

Node.js must be v16.x

Build for your current platform:

```bash
npm run electron:build
```

Build for all platforms:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Credits

### Mitwirkende

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Andere

- GPT-4 hat einen Großteil des Codes beigesteuert
- ChatGPT, Bing Chat und Google bieten viele Lösungen (in dieser Reihenfolge)
- Inspiriert von [ChatHub](https://github.com/chathub-dev/chathub). Respekt!

## Sponsor

Wenn Ihnen dieses Projekt gefällt, erwägen Sie bitte:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
