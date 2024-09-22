import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import { Field, Form, ErrorMessage } from "vee-validate";
import "./plugins/vee-validate.config";
import "vue3-toastify/dist/index.css";
import { createI18n } from "vue-i18n";
import { getLangUser } from "./utils/cookie";

import en from "./locales/en.json";
import jp from "./locales/jp.json";
import vn from "./locales/vn.json";

const i18n = createI18n({
  legacy: false,
  locale: getLangUser("lang") ?? "en",
  messages: {
    en: en,
    vi: vn,
    jp: jp,
  },
});
const app = createApp(App);
const pinia = createPinia();
app.component("Field", Field);
app.component("Form", Form);
app.component("ErrorMessage", ErrorMessage);
app.use(i18n);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
