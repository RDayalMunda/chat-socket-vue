import { io } from 'socket.io-client'
import { ref } from 'vue'

export const socket = ref(null)

export function initSocket(userConfig){
  socket.value = io(import.meta.env.VITE_SOCKET_URL, {
    query: {
      userConfig: JSON.stringify(userConfig)
    }
  })
}

export function disconnectSocket(){
  socket.value.disconnect()
}
