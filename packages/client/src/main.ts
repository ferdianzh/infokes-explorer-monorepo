import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import { router } from "./routers";
import { createPinia } from "pinia";

createApp(App).use(router).use(vuetify).use(createPinia()).mount("#app");
