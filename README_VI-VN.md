<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Trò chuyện đồng thời với tất cả những AI bots, Tìm ra câu trả lời tốt nhất </strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | Tiếng Việt | [简体中文](README_ZH-CN.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ai-shifu/ChatALL)

</div>

## Ảnh chụp màn hình

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Tính năng

Large Language Models (LLMs) based AI bots đều rất tuyệt. Tuy nhiên, hành vi đối với các câu hỏi lại là ngẫu nhiên và mỗi bots lại có thế mạnh, sự vượt trội ở các loại nhiệm vụ khác nhau. Nếu bạn muốn có được trải nghiệm tốt nhất, đừng thử với từng cái một. ChatAll (Tên Tiếng Trung: 齐叨) sẽ gửi đồng loạt tin nhắn tới một số lượng lớn các bots AI, giúp bạn tìm ra kết quả tốt nhất. Tất cả những gì bạn cần làm là [tải xuống, cài đặt](https://github.com/ai-shifu/ChatALL/releases) và đặt câu hỏi.

### Đây có phải là bạn?

Những người dùng điển hình của ChatALL là:

- 🤠**Chuyên gia về LLMs**, những người muốn tìm câu trả lời hoặc sáng tạo tốt nhất từ LLMs.
- 🤓**Nhà nghiên cứu về LLMs**, những người muốn so sánh trực quan điểm mạnh và điểm yếu của các LLMs khác nhau trong các lĩnh vực khác nhau.
- 😎**Nhà phát triển ứng dụng LLM**, những người muốn nhanh chóng gỡ lỗi prompts và tìm các mô hình nền tảng hoạt động tốt nhất.

### Danh sách AI Bots được hỗ trợ

| AI Bots                                                                        | Truy cập Web | API          | Ghi chú                                               |
| ------------------------------------------------------------------------------ | ------------ | ------------ | ----------------------------------------------------- |
| [360 AI Brain](https://ai.360.cn/)                                             | Có           | Không có     |                                                       |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | Không        | Có           |                                                       |
| [Character.AI](https://character.ai/)                                          | Có           | Không có     |                                                       |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Có           | Không có API | Không yêu cầu tài khoản                               |
| [ChatGPT](https://chatgpt.com)                                                 | Có           | Có           | Bao gồm cả trình duyệt Web, Azure OpenAI service      |
| [Claude](https://www.anthropic.com/claude)                                     | Có           | Có           |                                                       |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Có           | Không có     |                                                       |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | Không        | Có           |                                                       |
| [Các mô hình Cohere Command R](https://cohere.com/command)                     | Không        | Có           |                                                       |
| [Copilot](https://copilot.microsoft.com/)                                      | Có           | Không có API |                                                       |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Sắp ra mắt   | Không có API |                                                       |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Có           | Không có     |                                                       |
| [Gemini](https://gemini.google.com/)                                           | Có           | Có           |                                                       |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Có           | Không có     |                                                       |
| [Gradio](https://gradio.app/)                                                  | Có           | Không có API | Dành cho models Hugging Face không gian/tự triển khai |
| [Groq Cloud](https://console.groq.com/docs/models)                             | Không có     | Có           |                                                       |
| [HuggingChat](https://huggingface.co/chat/)                                    | Có           | Không có API |                                                       |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Có           | Sắp ra mắt   |                                                       |
| [Kimi](https://kimi.moonshot.cn/)                                              | Có           | Không có     |                                                       |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Có           | Không có     |                                                       |
| [MOSS](https://moss.fastnlp.top/)                                              | Có           | Không có API |                                                       |
| [Perplexity](https://www.perplexity.ai/)                                       | Có           | Không có     |                                                       |
| [Phind](https://www.phind.com/)                                                | Có           | Không có     |                                                       |
| [Pi](https://pi.ai)                                                            | Có           | Không có     |                                                       |
| [Poe](https://poe.com/)                                                        | Có           | Sắp ra mắt   |                                                       |
| [SkyWork](https://neice.tiangong.cn/)                                          | Có           | Sắp ra mắt   |                                                       |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Có           | Sắp ra mắt   |                                                       |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Có           | Không có API | Không yêu cầu tài khoản                               |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Có           | Không có     |                                                       |
| [xAI Grok](https://x.ai)                                                       | Không        | Có           |                                                       |
| [YouChat](https://you.com/)                                                    | Có           | Không có     |                                                       |
| [You](https://you.com/)                                                        | Có           | Không có     |                                                       |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Có           | Không có     |                                                       |

Bình chọn cho bot yêu thích của bạn trong [những vấn đề này](https://github.com/ai-shifu/ChatALL/labels/more%20LLMs).

### Lưu ý về độ tin cậy của các bot AI dựa trên Web

Các bot AI dựa trên Web (được đánh dấu là "Web Access") vốn kém tin cậy hơn và thường xuyên gặp vấn đề về tính ổn định. Điều này là do các nhà cung cấp dịch vụ thường xuyên cập nhật giao diện web và các biện pháp bảo mật của họ, đòi hỏi phải liên tục bảo trì thông qua kỹ thuật dịch ngược. Kiểu kết nối này khó duy trì và có thể ngừng hoạt động đột ngột. Để có trải nghiệm đáng tin cậy hơn, chúng tôi đặc biệt khuyến nghị sử dụng các bot có hỗ trợ API khi có thể.

### Tính năng khác

- Chế độ Quick-prompt: gửi prompt tiếp theo đó mà không cần chờ yêu cầu trước đó hoàn thành
- Lưu trữ lịch sử trò chuyện trên máy tính cục bộ, bảo vệ quyền riêng tư của bạn
- Highlight câu trả lời bạn yêu thích và xóa câu trả lời có giá trị thấp
- Bật / Tắt bất kỳ bots nào vào bất kỳ thời điểm nào
- Chuyển đổi giữa chế độ xem một, hai hoặc ba cột
- Tự động cập nhật phiên bản mới nhất
- Chế độ tối (đóng góp bởi @tanchekwei)
- Phím tắt. Nhấn <kbd>Ctrl</kbd> + <kbd>/</kbd> để biết tất cả (đóng góp bởi @tanchekwei)
- Nhiều cuộc trò chuyện (đóng góp bởi @tanchekwei)
- Cài đặt proxy (đóng góp bởi @msaong)
- Quản lý prompt (đóng góp bởi @tanchekwei)
- Hỗ trợ đa ngôn ngữ (Tiếng Anh, Tiếng Trung, Tiếng Đức, Tiếng Pháp, Tiếng Nga, Tiếng Việt, Tiếng Hàn, Tiếng Nhật, Tiếng Tây Ban Nha, Tiếng Ý)
- Hỗ trợ Windows, macOS và Linux

Tính năng đang phát triển:

Chúng tôi rất hoan nghênh sự đóng góp của bạn cho các tính năng này.

- [ ] Triển khai front-end lên GitHub Pages

## Quyền riêng tư

Tất cả lịch sử trò chuyện, cài đặt và dữ liệu đăng nhập được lưu cục bộ trên máy tính của bạn.

ChatALL thu thập dữ liệu sử dụng ẩn danh để giúp chúng tôi cải thiện sản phẩm. Bao gồm:

- AI bots nào được sử dụng và độ dài của prompt. Không bao gồm nội dung prompt.
- Độ dài của câu trả lời, và câu trả lời nào bị xóa/được highlight. Không bao gồm nội dung câu trả lời.

## Điều kiện tiên quyết

ChatALL là một client, không phải là proxy. Vì vậy, bạn cần:

1. Có tài khoản đang hoạt động hoặc có khóa API tokens cho các bots.
2. Có kết nối mạng đáng tin cậy tới các bots.

## Tải xuống / Cài đặt

Tải xuống từ https://github.com/ai-shifu/ChatALL/releases

### Windows

Chỉ cần tải xuống tệp \*-win.exe và tiến hành cài đặt.

### macOS

Đối với những dòng máy Mac sử dụng chip M1, M2, tải xuống tệp \*-mac-arm64.dmg.

Đối với những dòng máy Mac còn lại, tải xuống tệp \*-mac-x64.dmg.

Nếu bạn đang sử dụng [Homebrew](https://brew.sh/), bạn cũng có thể cài đặt bằng lệnh:

```bash
brew install --cask chatall
```

### Linux

Các bản phân phối dựa trên Debian: Tải xuống tệp .deb, nhấp đúp vào nó và cài đặt phần mềm.
Các bản phân phối dựa trên Arch: Bạn có thể clone ChatALL từ AUR [tại đây](https://aur.archlinux.org/packages/chatall-bin). Bạn có thể cài đặt thủ công hoặc sử dụng trình trợ giúp AUR như yay hoặc paru.
Các bản phân phối khác: Tải xuống tệp .AppImage, đặt nó thành có thể thực thi và tận hưởng trải nghiệm click-to-run. Bạn cũng có thể sử dụng [AppimageLauncher](https://github.com/TheAssassin/AppImageLauncher).

## Xử lý sự cố

Nếu bạn gặp bất kỳ vấn đề nào khi sử dụng ChatALL, bạn có thể thử các phương pháp sau để giải quyết:

1. **Làm mới** - nhấn <kbd>Ctrl</kbd> + <kbd>R</kbd> hoặc <kbd>⌘</kbd> + <kbd>R</kbd>.
2. **Khởi động lại** - thoát ChatALL và chạy lại.
3. **Đăng nhập lại** - nhấp vào nút cài đặt ở góc trên bên phải, sau đó nhấp vào liên kết đăng nhập/đăng xuất tương ứng để đăng nhập lại trang web.
4. **Tạo cuộc trò chuyện mới** - nhấp vào nút `Cuộc trò chuyện mới` và gửi prompt lại.

Nếu không có phương pháp nào ở trên hoạt động, bạn có thể thử **đặt lại ChatALL**. Lưu ý rằng điều này sẽ xóa tất cả cài đặt và lịch sử tin nhắn của bạn.

Bạn có thể đặt lại ChatALL bằng cách xóa các thư mục sau:

- Windows: `C:\Users\<user>\AppData\Roaming\chatall\`
- Linux: `/home/<user>/.config/chatall/`
- macOS: `/Users/<user>/Library/Application Support/chatall/`

Nếu vấn đề vẫn tiếp tục, vui lòng [gửi issue](https://github.com/ai-shifu/ChatALL/issues).

## Dành cho các Nhà phát triển

### Đóng góp Bot

[Hướng dẫn](docs/developing_bot.md) này sẽ giúp bạn.

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

<a href="https://github.com/ai-shifu/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ai-shifu/ChatALL" />
</a>

### Vài thông tin khác

- GPT-4 đóng góp rất nhiều mã nguồn
- ChatGPT, Copilot và Google cung cấp nhiều giải pháp (được xếp hạng theo thứ tự)
- Lấy cảm hứng từ [ChatHub](https://github.com/chathub-dev/chathub). Tôn trọng!

## Sponsor

Nếu bạn thích dự án này, xin vui lòng xem xét:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
