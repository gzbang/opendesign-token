import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import "./assets/fonts/HarmonyOS/harmonyos-fonts.scss";
// import "./assets/fonts/HarmonyOS/harmonyos-fonts.less";

createApp(App).use(router).mount("#app");
