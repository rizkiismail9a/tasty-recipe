import "bootstrap/dist/css/bootstrap.css";
import "./assets/main.css";
import { router } from "./routes.js";
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.use(router);
app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
