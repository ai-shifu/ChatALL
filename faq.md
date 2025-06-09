
# Frequently Asked Questions (FAQ)

This FAQ summarizes common issues encountered by chatGPTbox users and provides suggested solutions based on discussions in the GitHub Issues section.

If you still haven't found what you're looking for, please submit an [Issue](https://github.com/josStorer/chatGPTBox/issues).

---

### Cannot login to ChatGPT.com with this extension active using Brave web browser

#### [#794]( https://github.com/josStorer/chatGPTBox/issues/794 )

encounter 'something went wrong' with ChatGPTBox extension enabled

**Possible causes:**
- The extension modifies some network requests or page content, which may interfere with the ChatGPT.com login flow.

- Brave browser’s built-in privacy protections( shields, blocking scripts or cookies ) may conflict with the extension.

**Solution:**
1. disable the extension
2. Log in
3. Re-enable it

**not officially fixed yet**


### Google Gemini not working

#### [#786]( https://github.com/josStorer/chatGPTBox/issues/786 ), [#757]( https://github.com/josStorer/chatGPTBox/issues/757 )

Sometimes working
**not officially fixed yet**

**Possible causes: **

- Google Gemini’s web interface/API may have changed or is unstable.

- The ChatGPTBox extension’s current integration with Gemini is incomplete or experimental.

- Authentication or session handling is inconsistent.

- Gemini may block access depending on region or account type. 

**Possible solutions: **

- Try refreshing the page or restarting the browser. 

- Try logging out of Google and logging in again. 

- Check if there is an updated version of the extension — newer versions may fix compatibility issues.



### bilibili not working correctly

#### [#732]( https://github.com/josStorer/chatGPTBox/issues/732 ), [#703]( https://github.com/josStorer/chatGPTBox/issues/703 )

** Possible causes: **

- Bilibili uses dynamic page loading (SPA) and complex DOM structure, which may interfere with the extension’s side panel injection. 

- The site may block iframe embedding or restrict third-party scripts. 

- Bilibili’s CSS appears to override the Markdown styles used by the extension.

- Conflicts with bilibili’s own content scripts or other extensions. 

- Extension may not detect the correct text input areas on the site.

**Possible solutions: **


- Try enabling floating window mode in ChatGPTBox settings.This works better on sites that block side panels.

- Test on different pages (e.g. video page vs. homepage vs. comments)

- Try disabling other extensions that interact with Bilibili.

