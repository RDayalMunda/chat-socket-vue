import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { initStoreSubscription } from "./store";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
initStoreSubscription();
app.mount("#app");
