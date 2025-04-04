<template>
  <div>Hello to Chat bandhu</div>
  <p>Logged in as {{ userConfig.name }}->{{ userConfig.id }}</p>
  <UserList ref="userListRef" @openChat="openChat" />
  <ChatList ref="chatListRef"  />
</template>

<script setup>
import UserList from "./UserList.vue";
import ChatList from "./ChatList.vue";
import { computed, inject, ref } from "vue";

const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);4


const userListRef = ref(null);
const chatListRef = ref(null);



function openChat(groupData) {
  console.log("groupData", groupData);
}
</script>
