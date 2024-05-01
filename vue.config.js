const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "ai.chatall",
        productName: "ChatALL",
        artifactName: "${productName}-${version}-${os}-${arch}.${ext}",
        directories: {
          buildResources: "src/assets",
        },
        compression: "maximum",
        mac: {
          category: "public.app-category.utilities",
          target: "default",
          icon: "src/assets/icon.icns",
          hardenedRuntime: true,
          notarize: {
            teamId: "M4934264PN",
          },
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: ["ia32"],
            },
          ],
          icon: "src/assets/icon.ico",
        },
        linux: {
          target: ["AppImage", "deb"],
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
      /**
       * work around to fix this issue: https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1647#issuecomment-1019400838
       * some resources is defined by url in css file can't be loaded on production build (urls start with app:///)
       * docs of package related to this issue: https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#changing-the-file-loading-protocol
       * */
      customFileProtocol: "./",
    },
  },
});
