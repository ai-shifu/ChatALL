<template>
    <div id="app">
        <header>
            <div class="header-content">
                <img class="logo" src="assets/logo.png" alt="ChatALL" />
                <div class="view-buttons">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </div>
            </div>
        </header>
        <main class="content">
            <!-- Content goes here -->
        </main>
        <footer>
            <div class="footer-content">
                <textarea class="prompt-input" placeholder="Type your message..."></textarea>
                <button class="send-button">Send</button>
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
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content {
    flex: 1;
    background-color: #f3f3f3;
}

footer {
    background-color: white;
    padding: 16px;
}

.footer-content {
    display: flex;
    gap: 8px;
    align-items: center;
}

.prompt-input {
    flex: 1;
    resize: none;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
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
