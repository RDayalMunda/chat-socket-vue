<template>
  <div>
    <h2>Chat List</h2>
  </div>
</template>
<script setup>
import { inject, onMounted, ref } from "vue";
import api from "@/utility/api";

const chatList = ref([]); //chat list is the list of the groups the user has created or joined
const mainProps = inject("mainProps");
const userConfig = mainProps.userConfig;


onMounted(() => {
});
</script>

