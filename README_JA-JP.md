<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>全てのAIと同時にチャットし、ベストを見つける</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | 日本語 | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## 画像

![Screenshot](screenshots/screenshot-1.png?raw=true)

## 特徴

大規模言語モデル（LLM）ベースの AIは素晴らしいです。しかし、その回答はAIによってバラバラで、AIによって得意とする処理が異なります。最高の体験をしたいのであれば、AIを別々に毎回試すのはやめましょう！ChatALLは、同時に複数のAIにメッセージを送信することができ、各AIの回答を見て比較するのに役立ちます。ChatALLを使うのに必要なのは[ダウンロード・インストール](https://github.com/sunner/ChatALL/releases)・質問それだけです。

### あなたの目的は？

ChatALLのユーザーはこんな感じ：

- 🤠**LLMのプロたち**, LLMから最高の答えや創造物を見つけたい人たち。
- 🤓**LLMの研究者**, 様々な分野のLLMの長所と短所を直感的に比較したい人。
- 😎**LLMアプリケーションの開発者**, プロンプトを素早くデバッグし、最もパフォーマンスの高い基礎モデルを見つけたい人。

### 対応するAI

| 対応AI                                                        | webアクセス | API   | 確認事項                               |
| ------------------------------------------------------------ | -------- | -------- | ----------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | はい　　　| あり　　　|  ブラウジングを含む                     |
| [Bing Chat](https://www.bing.com/new)                        | はい　　　| なし　　　| ログイン不要 [ログインするとターン数上昇]  |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | いいえ　　| あり　　　|                                      |
| [Bard](https://bard.google.com/)                             | はい　　　| 近日登場　|                                      |
| [Poe](https://poe.com/)                                      | はい　　　| 近日登場　|                                      |
| [MOSS](https://moss.fastnlp.top/)                            | はい　　　| なし　　　|                                      |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | はい　　　| 近日登場　|                                      |
| [Dedao Learning Assistant](https://ai.dedao.cn/)             | 近日登場　| なし　　　|                                      |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | はい　　　| 近日登場　|                                      |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | はい　　　| なし　　　| ログイン不要                           |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | はい　　　| なし　　　| ログイン不要                           |
| [ChatGLM](https://chatglm.cn/blog)                           | はい　　　| なし　　　| ログイン不要                           |
| [Claude](https://www.anthropic.com/index/introducing-claude) | はい　　　| なし　　　| ログイン不要                           |
| [Gradio](https://gradio.app/)                                | はい　　　| なし　　　| Hugging Face space/自己配布モデル用     |
| [HuggingChat](https://huggingface.co/chat/)                  | はい　　　| なし　　　|                                      |
| [QianWen](https://qianwen.aliyun.com/)                       | はい　　　| 近日登場　|                                      |
| [You](https://you.com/)                                      | はい　　　| なし　　　|                                      |
| [Pi](https://pi.ai)                                      | はい　　　| なし　　　|                                      |

まだまだ続きます。[Issuesタブ](https://github.com/sunner/ChatALL/labels/more%20LLMs)でお気に入りのAIを提案してください。

### その他特徴

- クイックプロンプトモード：前の回答を待たずに次の質問を送信する機能
- チャット履歴をローカルに保存し、プライバシーを保護
- 気に入ったメッセージをピン止めし、悪いメッセージを削除
- 使いたいAIをいつでも変更することができます。
- 回答を1列～3列の表示切替
- 最新バージョンへの自動通知と自動アップデート
- ダークモード対応（提供者 @tanchekwei）
- `Ctrl + /` または `Cmd + /` で全てのショートカットキーが表示 (提供者 @tanchekwei)
- マルチチャット対応 (提供者 @tanchekwei)
- プロキシ設定をサポート (提供者 @msaong)
- 対応言語：日本語、英語、中国語、スペイン語、ドイツ語、フランス語、ロシア語、ベトナム語、韓国語
- Windows、macOS、Linux対応 

今後リリース予定の機能:

これらの機能への貢献は大歓迎です。

- [ ] フロントエンドをGitHub Pagesにデプロイする。

## 前提条件

ChatALL はプロキシではなく、クライアントです。そのため、以下のことが前提です:

1. AI用のアカウントや API トークンを持っていること。
2. サイトへの信頼性の高いネットワーク接続があること。
3. VPN を使用する場合は、システム/グローバルプロキシとして設定されている必要があります。

## ダウンロード / インストール

https://github.com/sunner/ChatALL/releases からダウンロードできます。

### Windowsの場合

\*-win-x64.exe ファイルをダウンロードし、セットアップを進めてください。(x86 CPUは \*-win.exe をダウンロードしてください)

### macOSの場合

AppleシリコンMac (頭文字にMがあるCPU)は、\*-mac-arm64.dmg ファイルをダウンロードしてください。

Intel Macは、\*-mac-x64.dmg ファイルをダウンロードしてください。

[Homebrew](https://brew.sh/index_ja)を使用している場合は、次の方法でもインストールできます：

```bash
brew install --cask chatall
```

### Linuxの場合

.AppImage ファイルをダウンロードし、実行可能な状態にしてクリックで実行してください。

## トラブルシューティング

ChatALLをご利用中に問題が発生した場合は、以下の解決策をお試しください。：

1. **再読み込み** - `Ctrl + R` または `Cmd + R` を押す。
2. **アプリを再起動** - ChatALLを終了し、再度実行する。
3. **再ログイン** - 右上の設定ボタンをクリックし、各AIの `ログイン/ログアウト`をクリックして、サイトに再ログインします。
4. **すべてのメッセージを削除する** - 右上のほうきボタンをクリックし"はい"をクリックする。

上記の方法でもうまくいかない場合は、**ChatALLを初期化**してみてください。この場合、全ての設定とメッセージ履歴が削除されますのでご注意ください。

ChatALLを初期化するには、以下のディレクトリを削除します：

- Windows: `C:\Users\<user>\AppData\Roaming\ChatALL\`
- Linux: `/home/<user>/.config/ChatALL/`
- macOS: `/Users/<user>/Library/Application Support/ChatALL/`

問題が解決しない場合は、[報告してください。](https://github.com/sunner/ChatALL/issues)

## デベロッパー向け

### AIの提供

[ガイド](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA)を参考にしてください。

### 実行

```bash
npm install
npm run electron:serve
```

### ビルド

現在のプラットフォームに合わせてビルド:

```bash
npm run electron:build
```

あらゆるプラットフォームに対応したビルド:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## クレジット

### 貢献者

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### その他

- GPT-4はコードを提供した
- ChatGPT、Bing Chat、Googleは多くの解決策を提供しています（ランキング順）
- [ChatHub](https://github.com/chathub-dev/chathub)のリスペクトです！

## 支援者

このプロジェクトが気に入ったら、支援にご検討ください：

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
