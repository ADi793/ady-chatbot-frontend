import { createContext } from "react";

export default createContext({
  chatsHistory: [],
  setChatsHistory: (history) => console.log("setting history"),
});
