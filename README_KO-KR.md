<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>모든 AI 봇과 동시에 채팅, 최고의 제품을 찾아보세요</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | 한국어 | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## 스크린샷

![Screenshot](screenshots/screenshot-1.png?raw=true)

## 기능

대규모 언어 모델(LLMs) 기반 AI 봇은 놀랍습니다. 하지만 봇의 행동은 무작위적일 수 있으며, 봇마다 다른 작업에서 뛰어난 능력을 발휘합니다. 최상의 경험을 원한다면 하나씩 사용해 보지 마세요. ChatALL (중국명: 齐叨)은 여러 AI 봇에 동시에 프롬프트를 전송하여 최상의 결과를 찾을 수 있도록 도와줍니다. [다운로드, 설치](https://github.com/sunner/ChatALL/releases)한 후 물어보기만 하면 됩니다.

### 본인인가요?

ChatALL의 일반적인 사용자는 다음과 같습니다:

- 🤠**LLM의 전문가**, LLM에서 최고의 답이나 창작물을 찾고 싶어하는 사람.
- 🤓**LLM의 연구원**, 다양한 분야에서 다양한 LLM의 강점과 약점을 직관적으로 비교하고자 하는 사람.
- 😎**LLM 응용 프로그램 개발자**, 프롬프트를 빠르게 디버그하고 가장 성능이 좋은 기초 모델을 찾고자 하는 사용자.

### 지원되는 봇

| AI 봇                                                        | 웹 액세스 | API       | 참고                                |
| ------------------------------------------------------------ | --------- | --------- | ----------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | 예        | 예        | 웹 브라우징 포함                    |
| [Bing Chat](https://www.bing.com/new)                        | 예        | API 없음  | 로그인 필요 없음                    |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | 아니오    | 예        |                                     |
| [Bard](https://bard.google.com/)                             | 예        | API 없음  |                                     |
| [Poe](https://poe.com/)                                      | 예        | 근일 개봉 |                                     |
| [MOSS](https://moss.fastnlp.top/)                            | 예        | API 없음  |                                     |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | 예        | 근일 개봉 |                                     |
| [Dedao Learning Assistant](https://ai.dedao.cn/)             | 근일 개봉 | API 없음  |                                     |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | 예        | 근일 개봉 |                                     |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | 예        | API 없음  | 로그인 필요 없음                    |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | 예        | API 없음  | 로그인 필요 없음                    |
| [ChatGLM](https://chatglm.cn/blog)                           | 예        | API 없음  | 로그인 필요 없음                    |
| [Claude](https://www.anthropic.com/index/introducing-claude) | 예        | API 없음  | No Login required                   |
| [Gradio](https://gradio.app/)                                | 예        | API 없음  | Hugging Face space/자체 배포 모델용 |
| [HuggingChat](https://huggingface.co/chat/)                  | 예        | API 없음  |                                     |
| [SkyWork](https://neice.tiangong.cn/)                        | 예         | 근일 개봉 |                                             |
| [You](https://you.com/)                                      | 예         | API 없음      |                                             |
| [Pi](https://pi.ai)                                      | 예         | API 없음      |                                             |

그리고 더...

### 기타 기능

- 빠른 프롬프트 모드: 이전 요청이 완료될 때까지 기다리지 않고 다음 프롬프트 보내기
- 채팅 기록을 로컬로 저장하고 개인 정보 보호
- 원하는 응답을 강조 표시하고, 나쁜 응답을 삭제
- 언제든지 모든 봇 사용/사용 안 함
- 1열, 2열 또는 3열 보기 간 전환
- 최신 버전으로 자동 업데이트
- 다크 모드 (@tanchekwei 기여)
- 단축키. Ctrl + /`를 누르면 모든 단축키를 확인할 수 있습니다 (@tanchekwei 기여).
- 다중 채팅 (@tancheckwei 기여)
- 프록시 설정 지원 (@msaong에서 제공)
- 여러 언어 ( 한국어, 중국어, 영어, 독일어, 프랑스어, 러시아어, 베트남어, 일본어, 스페인어, 이탈리아어) 지원
- Windows, macOS 및 Linux 지원

계획된 기능:

이러한 기능에 참여하는 것을 환영합니다.

- [ ] GitHub 페이지에 프런트엔드 배포

## 전제 조건

ChatALL은 프록시가 아닌 클라이언트입니다. 따라서 다음을 수행해야 합니다:

1. 봇에 대한 작업 계정 및/또는 API 토큰을 보유합니다.
2. 봇에 대한 신뢰할 수 있는 네트워크 연결을 유지합니다.
3. VPN을 사용하는 경우 시스템/전역 프록시로 설정해야 합니다.

## 다운로드 / 설치

https://github.com/sunner/ChatALL/releases에서 다운로드

### Windows에서

\*-win.exe 파일을 다운로드하고 설치를 계속합니다.

### macOS에서

Apple Silicon Mac (M1, M2 CPU)의 경우 \*-mac-arm64.dmg 파일을 다운로드합니다.

다른 Mac의 경우 \*-mac-x64.dmg 파일을 다운로드합니다.

[Homebrew](https://brew.sh/), )를 사용하는 경우 다음과 함께 설치할 수도 있습니다:

```bash
brew install --cask chatall
```

### Linux에서

.AppImage 파일을 다운로드하여 실행 파일로 만들고 클릭하고 실행 환경을 즐기십시오.

## 문제 해결

ChatALL을 사용하는 동안 문제가 발생하면 다음 방법을 사용하여 문제를 해결할 수 있습니다:

1. **새로 고침** - `Ctrl + R` 또는 `Cmd + R` 을 누릅니다.
2. **다시 시작** - ChatALL을 종료하고 다시 실행합니다.
3. **다시 로그인** - 오른쪽 상단 모서리의 설정 버튼을 클릭한 다음 팝업 창에서 해당 로그인/로그아웃 링크를 클릭하여 웹 사이트에 다시 로그인합니다.
4. **모든 메시지 지우기** - 오른쪽 상단 모서리에 있는 빗자루 버튼을 클릭합니다.

위의 방법 중 어느 것도 효과가 없다면, **ChatALL 초기화**를 시도해 보세요. 이렇게 하면 모든 설정과 메시지 내역이 삭제된다는 점에 유의하세요.

다음 디렉터리를 삭제하여 ChatALL을 재설정할 수 있습니다:

- Windows: `C:\Users\<user>\AppData\Roaming\ChatALL\`
- Linux: `/home/<user>/.config/ChatALL/`
- macOS: `/Users/<user>/Library/Application Support/ChatALL/`

문제가 지속되면 [문제 제출](https://github.com/sunner/ChatALL/issues)로 문의해 주세요.

## 개발자용

### 봇 기부

[가이드](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA)가 도움이 될 수 있습니다.

### 실행

```bash
npm install
npm run electron:serve
```

### 빌드

현재 플랫폼에 맞게 빌드:

```bash
npm run electron:build
```

모든 플랫폼을 위한 빌드:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## 크레딧

### 기여자

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### 기타

- GPT-4는 코드의 많은 부분을 기여했습니다
- ChatGPT, Bing Chat 및 Google은 많은 솔루션을 제공합니다 (순서대로 나열)
- [ChatHub](https://github.com/chathub-dev/chathub)에서 영감을 받았습니다. 존경합니다!

## 후원

이 프로젝트가 마음에 드신다면 다음을 고려해 주십시오:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
