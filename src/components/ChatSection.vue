<template>
  <div>
    <h2>Chat Section</h2>
    <h3>{{ groupName }} -> {{ groupId }}</h3>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue';


const props = defineProps({
  groupData: {
    type: Object,
    required: true
  }
})

const mainProps = inject("mainProps");
const userConfig = computed(() => mainProps.userConfig);

const groupId = computed(() => props.groupData._id)
const groupName = computed(() => {
  if(props.groupData.isPersonal){
    if (props.groupData.users.length == 1) {
      return props.groupData.userNames[0]
    }
    const userIndex = props.groupData.users[0] == userConfig.value.id ? 1 : 0
    return props.groupData.userNames[userIndex]
  }
  return props.groupData.name
})

</script>