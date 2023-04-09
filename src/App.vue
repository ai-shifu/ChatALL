<template>
    <div id="app">
        <header>
            <div class="header-content">
                <img class="logo" src="assets/logo.png" alt="ChatALL" />
                <div class="view-buttons">
                    <button>{{ $t("header.singleColumn") }}</button>
                    <button>{{ $t("header.doubleColumn") }}</button>
                    <button>{{ $t("header.tripleColumn") }}</button>
                </div>
            </div>
        </header>
        <main class="content">
            <!-- Content goes here -->
        </main>
        <footer>
            <div class="footer-content">
                <textarea class="prompt-input" placeholder="Type your message..."></textarea>
                <button class="send-button">{{ $t("footer.sendPrompt") }}</button>
                <div class="icons">
                    <img src="assets/chatgpt-icon.png" alt="ChatGPT" />
                    <img src="assets/bingchat-icon.png" alt="Bing Chat" />
                    <img src="assets/wenxin-icon.png" alt="文心一言" />
                    <img src="assets/bard-icon.png" alt="Bard" />
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Arial", sans-serif;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 16px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
  height: 40px;
}

.content {
    flex: 1;
    background-color: #f3f3f3;
    padding: 16px;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  box-sizing: border-box;
}

.footer-content {
    display: flex;
    gap: 8px;
    align-items: center;
}

.prompt-input {
    width: 100%;
    height: 40px;
    resize: none;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
    box-sizing: border-box;
    outline: none;
}

.send-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.icons img {
    width: 32px;
    height: 32px;
    cursor: pointer;
}
</style>
