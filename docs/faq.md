
# Frequently Asked Questions (FAQ)

This FAQ summarizes common issues encountered by ChatALL users and provides suggested solutions based on discussions in the GitHub Issues section.

If you still haven't found the answer you're looking for, please submit an [Issue](https://github.com/ai-shifu/ChatALL/issues/new/choose).

---

### [#245](https://github.com/ai-shifu/ChatALL/issues/245), [#196](https://github.com/ai-shifu/ChatALL/issues/196)

#### the ChatALL window blank or white after launching

**Possible causes:**
- No API keys are configured
- Corrupted cache or settings file

**Solutions:**
1. Ensure you have added at least one valid API key (e.g., OpenAI, Claude).
2. Try clearing the cache:
   - **Windows**: `C:\Users\<YourUsername>\AppData\Roaming\ChatALL`
   - **macOS**: `~/Library/Application Support/ChatALL`
   - **Linux**: `~/.config/ChatALL` or check your distribution-specific path


### [#236](https://github.com/ai-shifu/ChatALL/issues/236), [#122]

#### Entered the API key, but it still doesn’t work.

**Possible causes:**
- Incorrect key format (e.g., accidental whitespace or missing prefix)
- Expired or invalid token
- The selected provider does not match the token type

**Solutions:**
- Double-check your token format.
- Ensure there are no extra spaces before or after the key.
- Verify that the key is valid and corresponds to the correct AI provider.

### [#231](https://github.com/ai-shifu/ChatALL/issues/231), [#197](https://github.com/ai-shifu/ChatALL/issues/197)


#### cannot run ChatALL on Linux/macOS. It won’t launch or gives permission errors.


**Common issues:**
- Missing execution permission
- macOS Gatekeeper blocking the app

**Solutions:**
- On Linux, add executable permission:
  ```bash
  chmod +x ChatALL.AppImage
  ./ChatALL.AppImage
