<template>
  <div class="chat-floater" @click="floaterClickHandler">
    <div class="chat-floater-header">
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { useChatBandhuStore } from "../store";

const mainProps = inject("mainProps");
const chatBandhuStore = useChatBandhuStore();
const lastChatGroup = computed(() => chatBandhuStore.getLastChatGroup);

const initials = computed(() => {
  if (mainProps?.userConfig?.name) {
    return mainProps?.userConfig?.name
      ?.trim()
      ?.split(" ")
      .map((name) => name[0])
      .join("");
  }
  return "";
});

function floaterClickHandler() {
  if (lastChatGroup.value) {
    chatBandhuStore.setIsChatSectionOpen(true);
  } else {
    console.log('on chat list');
  }
  
}

</script>

<style scoped>
.chat-floater {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  background-color: #4c96a0;
}
</style>
