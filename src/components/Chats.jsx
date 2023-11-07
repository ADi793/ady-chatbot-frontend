import {
  Box,
  Button,
  Icon,
  InputGroup,
  InputRightElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import Chat from "./Chat";
import { getFromLocalStorage } from "../utils/localStorage";
import {
  AUTH_KEY,
  CHAT_ANSWER,
  CHAT_QUESTION,
  JOIN,
  UNEXPECTED_ERROR,
} from "../utils/constants";
import { getRecent } from "../utils/list";
import ChatHistoryContext from "../contexts/ChatHistoryContext";
import RecentChatsContext from "../contexts/RecentChatsContext";
import apiClient from "../services/apiClient";
import getToastConfig from "../utils/getToastConfig";

const socket = io(import.meta.env.VITE_BACKEND_SERVICES);

const Chats = () => {
  const { chatsHistory, setChatsHistory } = useContext(ChatHistoryContext);
  const { recentChats, setRecentChats } = useContext(RecentChatsContext);

  const user = useAuth();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatsRef = useRef();
  const toast = useToast();

  useEffect(() => {
    socket.emit(JOIN, `user_${user.email}`);
    socket.on(CHAT_ANSWER, async (chat) => {
      try {
        setIsLoading(false);
        setQuestion("");
        setRecentChats((prev) =>
          prev.map((recentChat) => (recentChat.answer ? recentChat : chat))
        );

        const savedChat = await apiClient.post("/user/chats", chat, {
          headers: {
            [AUTH_KEY]: getFromLocalStorage(AUTH_KEY),
          },
        });
        setChatsHistory((prev) => [savedChat, ...prev]);
      } catch (error) {
        toast(getToastConfig(UNEXPECTED_ERROR));
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (recentChats.length === 0) {
      setRecentChats(getRecent(chatsHistory, 5));
    }
  }, [chatsHistory]);

  const handleChatSubmit = () => {
    setIsLoading(true);
    setRecentChats([...recentChats, { question }]);
    socket.emit(CHAT_QUESTION, {
      auth_token: getFromLocalStorage(AUTH_KEY),
      data: {
        question,
      },
    });
  };

  return (
    <Box
      h="calc(100vh - 170px)"
      overflowY="scroll"
      overflowX="hidden"
      paddingTop="52px"
      ref={chatsRef}
    >
      <Box>
        <Box>
          {Array.isArray(recentChats) &&
            recentChats.map((chat, key) => <Chat chat={chat} key={key} />)}
        </Box>
      </Box>
      <Box
        style={{
          position: "fixed",
          bottom: 0,
          left: "268px",
          right: "3px",
        }}
      >
        <InputGroup bg="white">
          <Textarea
            placeholder="Send a message"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
          <InputRightElement
            top="50%"
            transform="translateY(-50%)"
            marginRight={2}
          >
            <Button
              variant="outline"
              size="md"
              isDisabled={!question || isLoading}
              onClick={handleChatSubmit}
            >
              <Icon as={MdSend} boxSize={5} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default Chats;
