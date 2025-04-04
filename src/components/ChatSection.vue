<template>
  <div>
    <h2>Chat Section</h2>
    <h3>{{ groupName }} -> {{ groupId }}</h3>
    <input
      v-model="messageContent"
      type="text"
      placeholder="Enter message"
      @keyup.enter="sendMessage"
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
import { socket } from "../utility/socket";
import { db } from "../utility/idb";

const props = defineProps({
  groupData: {
    type: Object,
    required: true,
  },
});

const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);

const groupId = computed(() => props.groupData._id);
const groupName = computed(() => {
  if (props.groupData.isPersonal) {
    if (props.groupData.users.length == 1) {
      return props.groupData.userNames[0];
    }
    const userIndex = props.groupData.users[0] == userConfig.value.id ? 1 : 0;
    return props.groupData.userNames[userIndex];
  }
  return props.groupData.name;
});

const messageContent = ref("");
const messageList = ref([]);

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
  const messages = await db.messages
    .where("groupId")
    .equals(groupId.value)
    .toArray();
  messageList.value = messages;
}

onMounted(async () => {
  console.log("chage  is mounted, fetch messages from the idb");
  await getMessagesFromDatabase();
});

defineExpose({
  addMessage,
});
</script>
<style scoped>
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
