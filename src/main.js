import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import store from "./store";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import "material-design-icons/iconfont/material-icons.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#062AAA",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#062AAA",
        },
      },
    },
  },
});

// Baidu Analytics
const script = document.createElement("script");
script.innerHTML = `
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?db971892d9d031557ecf01c6dc0bfe44";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
  `;
document.head.appendChild(script);

// Inject geetest script for iFlytek Spark
fetch("https://static.geetest.com/g5/gd.js")
  .then((response) => response.text())
  .then((text) => {
    const script = document.createElement("script");
    script.textContent = text;
    document.head.appendChild(script);
  });

createApp(App).use(i18n).use(store).use(vuetify).mount("#app");
