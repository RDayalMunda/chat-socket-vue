<template>
  <ChatBandhu v-if="userConfig.id" />
</template>
<script setup>
import { provide, watch } from "vue";
import ChatBandhu from "./components/ChatBandhu.vue";
import { searchInArray } from "./utility/helpers";

const props = defineProps({
  userConfig: {
    type: Object,
    // required: true, // not required in dev
    default: () => ({
      id:
        localStorage.getItem("chat-bandhu-user-id") ||
        "987654321098765432101234", // some unique Id of the user
      name: localStorage.getItem("chat-bandhu-user-name") || "Ram Dayal", // name of the user
    }),
  },
  getUsersList: {
    type: Function,
    // required: true, // not required in dev
    default: (searchQueryString) => {
      const userList = [
        {
          id: "987654321098765432101234",
          name: "Ram Dayal",
        },
        {
          id: "987654321098765432101235",
          name: "Poshan Soneshwary",
        },
        {
          id: "987654321098765432101236",
          name: "Amit Kumar",
        },
        {
          id: "987654321098765432101237",
          name: "Shubham Sharma",
        },
        {
          id: "987654321098765432101238",
          name: "Akshay Pethani",
        },
      ];
      return searchInArray(userList, searchQueryString);
    },
  },
});

watch(
  () => props.userConfig,
  () => {
    if (props.userConfig.id) {
      console.log("Chat Bandhu Started");
    } else {
      console.log("Chat Bandhu Stopped");
    }
  },
  { immediate: true }
);

provide("mainProps", props);
</script>
