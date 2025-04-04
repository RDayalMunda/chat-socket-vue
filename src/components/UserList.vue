<template>
  <div style="width: 50%">
    <h2>User List</h2>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      @input="searchUser"
    />
    <table style="border: 1px solid black; border-collapse: collapse">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userList" :key="user.id">
          <td>{{ user.id.slice(20) }}</td>
          <td>{{ user.name }}</td>
          <td>
            <button @click="startChat(user)">Chat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, ref } from "vue";
import api from "@/utility/api";

const mainProps = inject("mainProps");
const emit = defineEmits(["openChat"]);

const searchQuery = ref("");
const userList = ref([]);
const isLoading = ref(false);

const userConfig = computed( ()=> mainProps.userConfig );

async function startChat(user) {
  if (isLoading.value) {
    return;
  }
  try {
    isLoading.value = true;
    const payload = {
      users: [
        { id: userConfig.value.id, name: userConfig.value.name },
        { id: user.id, name: user.name }
      ]
    }
    const response = await api.post("/group/check-personal-group", payload);
    if (response.data.status === "success") {
      emit("openChat", response.data.groupData);
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}

function searchUser() {
  userList.value = mainProps.getUsersList(searchQuery.value);
}

onMounted(() => {
  searchUser();
});
</script>
