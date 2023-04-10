const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "ai.chatall",
        productName: "ChatALL",
        directories: {
          buildResources: "src/assets",
        },
        mac: {
          target: "dmg",
          icon: "src/assets/icon.icns",
        },
        win: {
          target: "nsis",
          icon: "src/assets/icon.ico",
        },
        linux: {
          target: "AppImage",
          icon: "src/assets/icon.png",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "";
      return args;
    });
  },
});
