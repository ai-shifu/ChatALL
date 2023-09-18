<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Trò chuyện đồng thời với tất cả những AI bots, Tìm ra câu trả lời tốt nhất </strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | Tiếng Việt | [简体中文](README_ZH-CN.md)

</div>

## Ảnh chụp màn hình

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Tính năng

Các Chat bots AI dựa trên Mô hình ngôn ngữ lớn (Large Language Models - LLMs) đều rất tuyệt. Tuy nhiên, hành vi đối với các câu hỏi lại là ngẫu nhiên và mỗi bots lại có thế mạnh, sự vượt trội ở các loại nhiệm vụ khác nhau. Nếu bạn muốn có được trải nghiệm tốt nhất, đừng thử với từng cái một. ChatAll (Tên Tiếng Trung: 齐叨) sẽ gửi đồng loạt tin nhắn tới một số lượng lớn các bots AI, giúp bạn tìm ra kết quả tốt nhất.

### Danh sách AI Bots được hỗ trợ

| AI Bots                                                      | Truy cập Web | API          | Ghi chú                                               |
| ------------------------------------------------------------ | ------------ | ------------ | ----------------------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | Có           | Có           | Bao gồm cả trình duyệt Web                            |
| [Bing Chat](https://www.bing.com/new)                        | Có           | Không có API |                                                       |
| [Baidu ERNIE](https://yiyan.baidu.com/)                      | No           | Có           |                                                       |
| [Bard](https://bard.google.com/)                             | Có           | Không có API |                                                       |
| [Poe](https://poe.com/)                                      | Có           | Sắp ra mắt   |                                                       |
| [MOSS](https://moss.fastnlp.top/)                            | Có           | Không có API |                                                       |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                  | Có           | Sắp ra mắt   |                                                       |
| [Dedao Learning Assistant](https://ai.dedao.cn/)             | Sắp ra mắt   | Không có API |                                                       |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                    | Có           | Sắp ra mắt   |                                                       |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | Có           | Không có API | Không yêu cầu tài khoản hoặc khóa API                 |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | Có           | Không có API | Không yêu cầu tài khoản hoặc khóa API                 |
| [ChatGLM](https://chatglm.cn/blog)                           | Có           | Không có API | Không yêu cầu tài khoản hoặc khóa API                 |
| [Claude](https://www.anthropic.com/index/introducing-claude) | Có           | Không có API | Không yêu cầu tài khoản hoặc khóa API                 |
| [Gradio](https://gradio.app/)                                | Có           | Không có API | Dành cho models Hugging Face không gian/tự triển khai |
| [HuggingChat](https://huggingface.co/chat/)                  | Có           | Không có API |                                                       |
| [QianWen](https://qianwen.aliyun.com/)                       | Có           | Sắp ra mắt   |                                                       |

Và hơn thế nữa ...

### Tính năng khác

- Chế độ Quick-prompt: gửi prompt tiếp theo đó mà không cần chờ yêu cầu trước đó hoàn thành
- Lưu trữ lịch sử trò chuyện trên máy tính cục bộ, bảo vệ quyền riêng tư của bạn
- Highlight câu trả lời bạn yêu thích và xóa câu trả lời có giá trị thấp
- Tự động duy trì phiên kết nối với ChatGPT
- Bật / Tắt bất kỳ bots nào vào bất kỳ thời điểm nào
- Chuyển đổi giữa chế độ xem một, hai hoặc ba cột
- Hỗ trợ đa ngôn ngữ (Tiếng Anh, Tiếng Trung)
- [TODO] Đưa ra gợi ý tốt nhất

## Điều kiện tiên quyết

ChatALL là một client, không phải là proxy. Vì vậy, bạn cần:

1. Có tài khoản đang hoạt động hoặc có khóa API tokens cho các bots.
2. Có kết nối mạng đáng tin cậy tới các bots.
3. Nếu bạn đang sử dụng VPN, nó phải được đặt làm proxy của system/global.

## Tải xuống / Cài đặt

Tải xuống từ: https://github.com/sunner/ChatALL/releases

### Windows

Chỉ cần tải xuống tệp \*-win.exe và tiến hành cài đặt.

### macOS

Đối với những dòng máy Mac sử dụng chip M1, M2, tải xuống tệp \*-mac-arm64.dmg.

Đối với những dòng máy Mac còn lại, tải xuống tệp \*-mac-x64.dmg.

### Linux

Tải xuống và chạy tệp .AppImage sau đó tận hưởng trải nghiệm click-to-run.

## Dành cho các Nhà phát triển

### Đóng góp Bot

[Hướng dẫn](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) này sẽ giúp bạn.

### Chạy thử

```bash
npm install
npm run electron:serve
```

### Build

Build cho nền tảng hiện tại của bạn:

```bash
npm run electron:build
```

Build cho mọi nền tảng:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Công nhận

### Các nhà đóng góp

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Vài thông tin khác

- GPT-4 đóng góp rất nhiều mã nguồn
- ChatGPT, Bing Chat và Google cung cấp nhiều giải pháp (được xếp hạng theo thứ tự)
- Lấy cảm hứng từ [ChatHub](https://github.com/chathub-dev/chathub). Tôn trọng!

## Sponsor

Nếu bạn thích dự án này, xin vui lòng xem xét:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
