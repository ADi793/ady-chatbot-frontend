import { createContext } from "react";

export default createContext({
  recentChats: [],
  setRecentChats: (recentChats) => console.log("setting recent chats..."),
});
