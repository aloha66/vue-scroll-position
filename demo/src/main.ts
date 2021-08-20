import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// import plugin from "../../dist/index.esm.js";
// import plugin from "../../src/index";

import plugin from "vue-scroll-position";

console.log("plugin", plugin);

createApp(App).use(router).use(plugin).mount("#app");
