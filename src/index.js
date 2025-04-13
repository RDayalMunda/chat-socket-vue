import ChatBandhu from "./App.vue";

// export { ChatBandhu };

// Optional: default export as plugin
export default {
  install(app) {
    app.component("ChatBandhu", ChatBandhu);
  },
};
