<template>
  <div>
    <h2>Chat List</h2>
    <div v-for="group in chatGroups" :key="group.id">
      <div class="chat-group" @click="openChat(group)">
        <p>
          <span>
            {{ group.name }}
          </span>
          <span v-if="typingObj[group._id]?.isTyping">
            Someone is typing...
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, ref } from "vue";
import api from "@/utility/api";
import { debounce } from "@/utility/helpers";

const emit = defineEmits(["openChat"]);

const chatList = ref([]); //chat list is the list of the groups the user has created or joined
const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);
const typingObj = ref({});

const loading = ref(false);
const chatGroups = ref([]);

async function getGroups() {
  try {
    if (loading.value) return;
    loading.value = true;
    const response = await api.get("/group/all", {
      params: { userId: userConfig.value.id },
    });
    if (response.data.status == "success") {
      chatGroups.value = response.data.groups || [];
      console.log("response.data.groups", response.data.groups);
    }
    chatList.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function openChat(group) {
  emit("openChat", group);
}

const clearTyping = debounce((groupId, senderId) => {
  delete typingObj.value[groupId][senderId];
  if (Object.keys(typingObj.value[groupId]).length <= 1) {
    typingObj.value[groupId].isTyping = false;
  }
}, 2000);

function showTypingHandler(response) {
  typingObj.value[response.groupId] = {
    ...typingObj.value[response.groupId],
    [response.senderId]: response.senderName,
    isTyping: true,
  };
  clearTyping(response.groupId, response.senderId);
}

onMounted(() => {
  getGroups();
});

defineExpose({
  showTypingHandler,
});
</script>

<style scoped>
.chat-group {
  cursor: pointer;
}
.chat-group:hover {
  background-color: #f0f0f0;
}
</style>
