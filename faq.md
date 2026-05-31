# Frequently Asked Questions (FAQ)

This FAQ summarizes common issues encountered by ChatALL users and provides
suggested solutions based on discussions in the GitHub Issues section.

If you still haven't found the answer you're looking for, please submit an [Issue](https://github.com/ai-shifu/ChatALL/issues/new/choose).

---

## The ChatALL window is blank or white after launching

Related issues: [#245](https://github.com/ai-shifu/ChatALL/issues/245), [#196](https://github.com/ai-shifu/ChatALL/issues/196)

**Possible causes:**

- No API keys are configured
- Corrupted cache or settings file

**Solutions:**

1. Ensure you have added at least one valid API key (e.g., OpenAI, Claude).
2. Try clearing the cache:
   - **Windows**: `C:\Users\<YourUsername>\AppData\Roaming\ChatALL`
   - **macOS**: `~/Library/Application Support/ChatALL`
   - **Linux**: `~/.config/ChatALL` or check your distribution-specific path

## The API key is entered, but it still doesn't work

Related issues: [#236](https://github.com/ai-shifu/ChatALL/issues/236), [#122](https://github.com/ai-shifu/ChatALL/issues/122)

**Possible causes:**

- Incorrect key format (e.g., accidental whitespace or missing prefix)
- Expired or invalid token
- The selected provider does not match the token type

**Solutions:**

- Double-check your token format.
- Ensure there are no extra spaces before or after the key.
- Verify that the key is valid and corresponds to the correct AI provider.

## ChatALL won't launch on Linux/macOS or gives permission errors

Related issues: [#231](https://github.com/ai-shifu/ChatALL/issues/231), [#197](https://github.com/ai-shifu/ChatALL/issues/197)

**Common issues:**

- Missing execution permission
- macOS Gatekeeper blocking the app

**Solutions:**

- On Linux, add executable permission:

  ```bash
  chmod +x ChatALL.AppImage
  ./ChatALL.AppImage
  ```

- On macOS, if Gatekeeper blocks ChatALL:
  1. Open **System Settings** > **Privacy & Security**.
  2. Find the ChatALL warning and click **Open Anyway**.
- If macOS still blocks a trusted download, remove the quarantine attribute:

  ```bash
  xattr -dr com.apple.quarantine \
    /Applications/ChatALL.app
  ```
