<template>
  <div style="width: 50%;">
    <h2>User List</h2>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      @input="searchUser"
    />
    <table style="width: 50%; border: 1px solid black; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.id }}</td>
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
import { inject, onMounted, ref } from "vue";

const searchQuery = ref("");
const userList = ref([]);

const mainProps = inject("mainProps");

function startChat(user) {
  console.log("to start chat with user", user);
}

function searchUser() {
  userList.value = mainProps.getUsersList(searchQuery.value);
  console.log("userList", userList.value);
}

onMounted(() => {
  console.log("mainProps", mainProps);
  searchUser();
});
</script>
