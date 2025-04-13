import { defineStore } from "pinia";

const localStateKey = "chat-bandhu";
function getInitialState() {
  const localState = localStorage.getItem(localStateKey);
  const parsedState = JSON.parse(localState || "{}");
  return {
    notificationCount: parsedState.notificationCount || 0,
    isChatSectionVisible: parsedState.isChatSectionVisible || true,
    lastChatGroup: parsedState.lastChatGroup || null,
    isChatSectionOpen: parsedState.isChatSectionOpen || false,
  };
}
export const useChatBandhuStore = defineStore(localStateKey, {
  state: () => getInitialState(),
  getters: {
    getNotificationCount() {
      return this.notificationCount;
    },
    getIsChatSectionVisible() {
      return this.isChatSectionVisible;
    },
    getLastChatGroup() {
      return this.lastChatGroup;
    },
    getIsChatSectionOpen() {
      return this.isChatSectionOpen;
    },
  },
  actions: {
    setNotificationCount(count) {
      this.notificationCount = count;
    },
    setIsChatSectionVisible(visible) {
      this.isChatSectionVisible = visible;
    },
    setLastChatGroup(group) {
      this.lastChatGroup = group;
    },
    setIsChatSectionOpen(status) {
      this.isChatSectionOpen = status;
    },
  },
});

export function initStoreSubscription() {
  const store = useChatBandhuStore();
  store.$subscribe((mutation, state) => {
    localStorage.setItem(localStateKey, JSON.stringify(state));
  });
}
