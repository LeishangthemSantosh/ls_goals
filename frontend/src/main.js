import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(Antd);
app.use(router);

app.mount("#app");
