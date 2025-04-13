<template>
  <div class="chat-section-container" v-if="isRender">
    <h3>
      {{ groupName }} -> {{ groupId }}
      <button @click="closeChatSection">X</button>
    </h3>
    <p>{{ typingText }}</p>
    <input
      v-model="messageContent"
      type="text"
      placeholder="Enter message"
      @keyup.enter="sendMessage"
      @input="throttleSendTypingEvent"
    />
    <button @click="sendMessage">Send</button>
    <div v-for="message in messageList" :key="message._id">
      <div class="chat-box">
        <div class="chat-box-sender">{{ message.senderName }}</div>
        <div class="chat-box-content">{{ message.content }}</div>
        <div class="chat-box-time">{{ message.createdAt }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, ref } from "vue";
import { useChatBandhuStore } from "../store";
import { socket } from "../utility/socket";
import { db } from "../utility/idb";
import { debounce, throttle } from "../utility/helpers";
import api from "@/utility/api";

const chatBandhuStore = useChatBandhuStore();
const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);
const groupData = computed(() => chatBandhuStore.getLastChatGroup);
const isChatSectionOpen = computed(() => chatBandhuStore.getIsChatSectionOpen);
const isRender = computed(() => isChatSectionOpen.value && groupData.value);

function closeChatSection() {
  chatBandhuStore.setIsChatSectionOpen(false);
}

const groupId = computed(() => groupData.value._id);
const groupName = computed(() => {
  if (groupData.value.isPersonal) {
    if (groupData.value.users.length == 1) {
      return groupData.value.userNames[0];
    }
    const userIndex = groupData.value.users[0] == userConfig.value.id ? 1 : 0;
    return groupData.value.userNames[userIndex];
  }
  return groupData.value.name;
});

const messageContent = ref("");
const messageList = ref([]);
const typingText = ref("");

async function sendMessage() {
  try {
    const messagePayload = {
      content: messageContent.value,
      groupId: groupId.value,
      senderId: userConfig.value.id,
      senderName: userConfig.value.name,
    };
    messageContent.value = "";
    socket.value.emit("message", messagePayload);
  } catch (err) {
    console.log(err);
  } finally {
  }
}

function addMessage(message) {
  messageList.value.push(message);
}

async function getMessagesFromDatabase() {
  try {
    const messages = await db.messages
      .where("groupId")
      .equals(groupId.value)
      .toArray();
    messageList.value = messages;
  } catch (err) {
    console.log(err);
  }
}

function sendTypingEvent() {
  const typingPayload = {
    groupId: groupId.value,
    senderId: userConfig.value.id,
    senderName: userConfig.value.name,
  };
  console.log("sending typing event");
  socket.value.emit("typing", typingPayload);
}

const throttleSendTypingEvent = throttle(sendTypingEvent, 1000);

const clearTypingText = debounce(() => {
  typingText.value = "";
}, 1000);

function showTypingHandler(typingObj) {
  if (typingObj.senderId == userConfig.value.id) {
    return;
  }
  typingText.value = typingObj.senderName + " is typing...";
  clearTypingText();
}

async function getMessagesFromServer() {
  try {
    const response = await api.get(`/message/${groupId.value}`);
    messageList.value = response.data.messages;
  } catch (err) {
    console.log(err);
  }
}

onMounted(async () => {
  // await getMessagesFromDatabase();
  getMessagesFromServer();
});

defineExpose({
  addMessage,
  showTypingHandler,
});
</script>
<style scoped>
.chat-section-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
.chat-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.chat-box-sender {
  font-size: 12px;
  color: #666;
}

.chat-box-content {
  font-size: 16px;
  color: #333;
}

.chat-box-time {
  font-size: 12px;
  color: #666;
}
</style>
