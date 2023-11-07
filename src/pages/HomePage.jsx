import { useState } from "react";
import { Grid } from "@chakra-ui/react";
import History from "../components/History";
import Chats from "../components/Chats";
import { getRecent } from "../utils/list";
import ChatHistoryContext from "../contexts/ChatHistoryContext";
import RecentChatsContext from "../contexts/RecentChatsContext";
import useChatsHistory from "../hooks/useChatsHistory";

function HomePage() {
  const { chatsHistory, setChatsHistory } = useChatsHistory();
  const [recentChats, setRecentChats] = useState(getRecent(chatsHistory, 5));

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
      paddingLeft="15px"
      paddingTop="25px"
    >
      <ChatHistoryContext.Provider value={{ chatsHistory, setChatsHistory }}>
        <RecentChatsContext.Provider value={{ recentChats, setRecentChats }}>
          <History />
          <Chats />
        </RecentChatsContext.Provider>
      </ChatHistoryContext.Provider>
    </Grid>
  );
}

export default HomePage;
