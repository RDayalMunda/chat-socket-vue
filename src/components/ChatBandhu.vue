<template>
  <div>Hello to Chat bandhu</div>
  <p>Logged in as {{ userConfig.name }}->{{ userConfig.id }}</p>
  <UserList ref="userListRef" @openChat="openChat" />
  <ChatList ref="chatListRef"  />
  <ChatSection ref="chatSectionRef" v-if="activeChat" :groupData="activeChat" />
</template>

<script setup>
import UserList from "./UserList.vue";
import ChatList from "./ChatList.vue";
import ChatSection from "./ChatSection.vue";

import { computed, inject, ref } from "vue";

const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);


const userListRef = ref(null);
const chatListRef = ref(null);
const chatSectionRef = ref(null);

const activeChat = ref(null)


function openChat(groupData) {
  activeChat.value = groupData
}
</script>
