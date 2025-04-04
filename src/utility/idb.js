// db.js
import Dexie from "dexie";

export const db = new Dexie(import.meta.env.VITE_IDB_NAME);
db.version(1).stores({
  // messages: '_id, content, groupId, senderId, senderName, createdAt, updatedAt' // these are all the fields// but we just have to define the indexes here
  messages: "_id, groupId, [groupId+updatedAt]",
});
