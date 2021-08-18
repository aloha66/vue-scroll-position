import { createApp } from "vue";
import router from "./demo/router";
import App from "./demo/App.vue";
// import plugin from "../dist/index.esm.js";
import plugin from "vue-scroll-position";

createApp(App).use(router).use(plugin).mount("#app");
