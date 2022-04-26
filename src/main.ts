import { createSSRApp } from "vue";
import App from "./App.vue";
import { Popup, Icon, PullRefresh  } from 'vant'
export function createApp() {
  const app = createSSRApp(App);
  app.use(Popup);
  app.use(Icon);
  app.use(PullRefresh);
  return {
    app,
  };
}
