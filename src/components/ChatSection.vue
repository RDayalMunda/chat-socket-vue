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
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, ref } from "vue";
import { socket } from "../utility/socket";

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
</script>
