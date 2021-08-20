import { App, isVue2 } from "vue-demi";
import type { Options, Router } from "../type";
import Scroll from "../core";

export default {
  install: (app: App, options: Options) => {
    let router: unknown;
    // Plugin code goes here
    if (isVue2) {
      router = options.router;
      if (!router) {
        console.error("please install vue router");
        return;
      }
    } else {
      const { $router } = app.config.globalProperties;
      if (!$router) {
        console.error("please install vue router");
        return;
      }
      router = $router;
    }

    const scroll = new Scroll(options);
    (router as Router).beforeEach((to, from, next) => {
      scroll.before(to, from, next);
    });

    (router as Router).afterEach((to) => {
      scroll.after(to);
    });
  },
};
