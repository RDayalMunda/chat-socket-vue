import { defineCustomElement } from "vue";

import App from "./App.vue";

const ChatBandhuElement = defineCustomElement(App);

customElements.define("chat-bandhu", ChatBandhuElement);
