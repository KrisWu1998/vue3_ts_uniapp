import { createSSRApp } from "vue";
import App from "./App.vue";
import { Popup } from 'vant'
export function createApp() {
  const app = createSSRApp(App);
  app.use(Popup);
  return {
    app,
  };
}
