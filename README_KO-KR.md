﻿<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>모든 AI 봇과 동시에 채팅, 최고의 제품을 찾아보세요</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [日本語](README_JA-JP.md) | 한국어 | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

</div>

## 스크린샷

![Screenshot](screenshots/screenshot-2.png?raw=true)
![Screenshot](screenshots/screenshot-1.png?raw=true)

## 기능

대규모 언어 모델(LLMs) 기반 AI 봇은 놀랍습니다. 하지만 봇의 행동은 무작위적일 수 있으며, 봇마다 다른 작업에서 뛰어난 능력을 발휘합니다. 최상의 경험을 원한다면 하나씩 사용해 보지 마세요. ChatALL (중국명: 齐叨)은 여러 AI 봇에 동시에 프롬프트를 전송하여 최상의 결과를 찾을 수 있도록 도와줍니다. [다운로드, 설치](https://github.com/sunner/ChatALL/releases)한 후 물어보기만 하면 됩니다.

### 지원되는 봇

| AI 봇                                                        | 웹 액세스 | API       | 참고                                |
| ------------------------------------------------------------ | --------- | --------- | ----------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | 예        | 예        | 웹 브라우징 포함                    |
| [Bing Chat](https://www.bing.com/new)                        | 예        | API 없음  | 로그인 필요 없음                    |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | 아니오    | 예        |                                     |
| [Bard](https://bard.google.com/)                             | 예        | API 없음  |                                     |
| [Poe](https://poe.com/)                                      | 근일 개봉 | 근일 개봉 |                                     |
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

그리고 더...

### 기타 기능

- 빠른 프롬프트 모드: 이전 요청이 완료될 때까지 기다리지 않고 다음 프롬프트 보내기
- 채팅 기록을 로컬로 저장하고 개인 정보 보호
- 원하는 응답을 강조 표시하고, 나쁜 응답을 삭제
- 자동으로 ChatGPT 세션 활성 상태 유지
- 언제든지 봇 사용/사용 안 함
- 1열, 2열 또는 3열 보기 간 전환
- 여러 언어(한국어, 중국어, 영어, 독일어, 프랑스어, 러시아어, 베트남어) 지원
- [TODO] 추천 베스트

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

소프트웨어의 악성 여부를 확인할 수 없다는 메시지가 표시될 경우 [Apple 공식 가이드](https://support.apple.com/guide/mac-help/apple-cant-check-app-for-malicious-software-mchleab3a043/mac)를 따라 진행합니다

### Linux에서

.AppImage 파일을 다운로드하여 실행 파일로 만들고 클릭하고 실행 환경을 즐기십시오.

## 개발자용

### 봇 기부

[가이드](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA)가 도움이 될 수 있습니다.

### 환경 종속자

Node.js는 v16.x여야 합니다

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
