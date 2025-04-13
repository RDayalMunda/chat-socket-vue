import { createApp } from "vue";
import App from "./App.vue";
import { initStoreSubscription } from "./store";

const app = createApp(App);
app.mount("#app");
