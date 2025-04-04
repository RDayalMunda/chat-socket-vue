<template>
  <p>Logged in as {{ userConfig.name }}->{{ userConfig.id }}</p>
  <UserList ref="userListRef" @openChat="openChat" />
  <ChatList ref="chatListRef"  />
  <ChatSection ref="chatSectionRef" v-if="activeChat" :groupData="activeChat" />
</template>

<script setup>
import UserList from "./UserList.vue";
import ChatList from "./ChatList.vue";
import ChatSection from "./ChatSection.vue";
import { socket } from '../utility/socket';

import { computed, inject, onMounted, ref } from "vue";

const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);


const userListRef = ref(null);
const chatListRef = ref(null);
const chatSectionRef = ref(null);

const activeChat = ref(null)


function openChat(groupData) {
  activeChat.value = groupData
}


function messageReceiveHandler(messageObj){
  console.log('SOCKET: onMessage:', messageObj)
  if (activeChat.value?._id == messageObj.message.groupId){
    console.log('update the message list there')
  } else {
    console.log('to show it as a unseen message')
  }
}

onMounted( ()=>{
  socket.value.on('onMessage', messageReceiveHandler)
} )

</script>
