<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>すべての AI ボットと同時にチャットし、ベストを発見する</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [简体中文](README_ZH-CN.md) | 日本語 | [Tiếng Việt](README_VI-VN.md) | [Français](README_FR-FR.md)

</div>

## スクリーンショット

![Screenshot](screenshots/screenshot-2.png?raw=true)
![Screenshot](screenshots/screenshot-1.png?raw=true)

## 特徴

大規模言語モデル（LLM）ベースの AI ボットは素晴らしいです。しかし、その挙動はランダムで、ボットによって得意とするタスクが異なります。最高の体験をしたいのであれば、ボットを1つずつ試すのはやめましょう。ChatALL （中国名：齐尔）は、複数の AI ボットに同時にプロンプトを送信することができ、最高の結果を発見するのに役立ちます。

### 対応するボット

| AI ボット                                                                  | Web アクセス  | API         |
| ------------------------------------------------------------------------- | ----------- | ----------- |
| [ChatGPT](https://chat.openai.com)                                        | はい         | はい         |
| [Bing Chat](https://www.bing.com/new)                                     | はい         | APIなし      |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                   | いいえ       | はい         |
| [Bard](https://bard.google.com/)                                          | はい         | APIなし      |
| [Poe](https://poe.com/)                                                   | 近日公開     | 近日公開     |
| [MOSS](https://moss.fastnlp.top/)                                         | はい         | APIなし      |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                               | 近日公開     | 近日公開     |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                          | 近日公開     | APIなし      |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                 | はい         | 近日公開     |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)                | はい         | APIなし      |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)                       | はい         | APIなし      |
| [ChatGLM](https://chatglm.cn/blog)                                        | はい         | APIなし      |
| [Claude](https://www.anthropic.com/index/introducing-claude)              | はい         | APIなし      |
| Hugging Face space/セルフデプロイモデルの [Gradio](https://gradio.app/)       | はい         | APIなし      |
| [HuggingChat](https://huggingface.co/chat/)                               | はい         | APIなし      |

などなど...

### その他の特徴

- クイックプロンプトモード: 前のリクエストが完了するのを待たずに次のプロンプトを送信
- チャット履歴をローカルに保存し、プライバシーを保護
- 気に入った応答をハイライトし、悪い応答を削除
- ChatGPT セッションを自動的に維持
- ボットの有効化/無効化をいつでも行えます
- 1列、2列、3列の表示切り替えが可能
- 複数の言語（en、zh）をサポート
- [TODO] ベストレコメンデーション

## 前提条件

ChatALL はプロキシではなく、クライアントです。そのため、以下のことが必要です:

1. ボット用のアカウントや API トークンを持っていること。
2. ボットへの信頼性の高いネットワーク接続があること。
3. VPN を使用する場合は、システム/グローバルプロキシとして設定されている必要があります。

## ダウンロード / インストール

https://github.com/sunner/ChatALL/releases からダウンロード

### Windows の場合

\*-win.exe ファイルをダウンロードし、セットアップを進めてください。

### macOS の場合

Apple Silicon Mac (M1, M2 CPU) の場合は、\*-mac-arm64.dmg ファイルをダウンロードしてください。

その他のMacの場合は、\*-mac-x64.dmg ファイルをダウンロードしてください。

### Linux の場合

.AppImage ファイルをダウンロードし、実行可能な状態にしてクリックで実行してください。

## 開発者向け

### ボットの提供

[ガイド](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) があなたのお役に立つかもしれません。

### 実行

```bash
npm install
npm run electron:serve
```

### ビルド

Node.js は v16.x であること

現在のプラットフォームに合わせてビルド:

```bash
npm run electron:build
```

あらゆるプラットフォームに対応したビルド:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## クレジット

### コントリビューター

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### その他

- GPT-4 は多くのコードを提供した
- ChatGPT、Bing Chat、Google が多くの解決策を提供（順不同）
- [ChatHub](https://github.com/chathub-dev/chathub) に触発されました。リスペクトです！
