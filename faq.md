# Frequently Asked Questions (FAQ)

This FAQ summarizes common issues encountered by ChatALL users and provides
suggested solutions based on the existing troubleshooting guidance and common
setup problems.

If you still haven't found the answer you're looking for, please submit an
[Issue](https://github.com/ai-shifu/ChatALL/issues/new/choose).

---

## The ChatALL window is blank or white after launching

### Possible causes

- Corrupted settings or user data
- A damaged local session after an update or crash

### Solutions

1. Refresh ChatALL or restart the app.
2. If the problem persists, reset ChatALL.

**Reset warning:** Resetting deletes all settings and message history. Back up
anything you need before deleting the user-data directory.

Delete the same user-data directory documented in the README:

- **Windows**: `C:\Users\<user>\AppData\Roaming\chatall\`
- **Linux**: `/home/<user>/.config/chatall/`
- **macOS**: `/Users/<user>/Library/Application Support/chatall/`

## The API key is entered, but it still doesn't work

### Possible causes

- Incorrect key format, such as accidental whitespace or a missing prefix
- Expired or invalid token
- The selected provider does not match the token type

### Solutions

- Double-check your token format.
- Ensure there are no extra spaces before or after the key.
- Verify that the key is valid and corresponds to the selected AI provider.

## ChatALL won't launch on Linux/macOS or gives permission errors

### Common issues

- The downloaded AppImage does not have executable permission on Linux
- macOS Gatekeeper is blocking the app

### Solutions

- On Linux, make the downloaded AppImage executable and run it:

  ```bash
  chmod +x ./ChatALL-*.AppImage
  ./ChatALL-*.AppImage
  ```

- On macOS, if Gatekeeper blocks ChatALL, open **System Settings** >
  **Privacy & Security**, find the ChatALL warning, and click **Open Anyway**.
- If macOS still blocks a trusted download, remove the quarantine attribute:

  ```bash
  xattr -dr com.apple.quarantine \
    /Applications/ChatALL.app
  ```
