<template>
  
  <div class="full-header">
    <p>Logged in as {{ userConfig.name }}->{{ userConfig.id }}</p>
    <button @click="isUserListVisible = !isUserListVisible">
      {{ isUserListVisible ? "Hide" : "Show" }} User List
    </button>
    <button @click="isChatListVisible = !isChatListVisible">
      {{ isChatListVisible ? "Hide" : "Show" }} Chat List
    </button>
  </div>
  <div class="full-container">
    <div v-show="isUserListVisible">
      <UserList ref="userListRef" @openChat="openChat" />
    </div>
    <div v-show="isChatListVisible">
      <ChatList ref="chatListRef" @openChat="openChat" />
    </div>
    <div>
      <h2>Chat Section</h2>
      <ChatSection
        v-if="activeChat"
        ref="chatSectionRef"
        :groupData="activeChat"
        :key="activeChat._id"
      />
    </div>
  </div>
</template>

<script setup>
import UserList from "./UserList.vue";
import ChatList from "./ChatList.vue";
import ChatSection from "./ChatSection.vue";
import { socket } from "../utility/socket";
import { db } from "../utility/idb";

import { computed, inject, onMounted, ref } from "vue";

const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);
const isUserListVisible = ref(true);
const isChatListVisible = ref(true);

const userListRef = ref(null);
const chatListRef = ref(null);
const chatSectionRef = ref(null);

const activeChat = ref(null);

function openChat(groupData) {
  activeChat.value = groupData;
}

function messageReceiveHandler(response) {
  console.log("SOCKET: onMessage:", response);
  db.messages.add(response.message);
  if (activeChat.value?._id == response.message.groupId) {
    console.log("update the message list there");
    chatSectionRef.value.addMessage(response.message);
  } else {
    console.log("to show it as a unseen message");
  }
}

function typingReceiveHandler(response) {
  if (chatListRef.value) {
    chatListRef.value.showTypingHandler(response.typing);
  }
  if (activeChat.value?._id == response.typing.groupId) {
    console.log("show typing inside the chat section");
  }
}

onMounted(() => {
  socket.value.on("onMessage", messageReceiveHandler);
  socket.value.on("onTyping", typingReceiveHandler);
});
</script>

<style scoped>
.full-header {
  display: flex;
  padding: 10px;
  height: 50px;
  max-height: 50px;
}
.full-container {
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
}
.full-container > div {
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: scroll;
}
</style>
