import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { AUTH_KEY } from "../utils/constants";
import { getFromLocalStorage } from "../utils/localStorage";
import useAuth from "./useAuth";

const useChatsHistory = () => {
  const [chatsHistory, setChatsHistory] = useState([]);
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (!user) return navigate("/auth/login");
    apiClient("/user/me", {
      headers: {
        [AUTH_KEY]: getFromLocalStorage(AUTH_KEY),
      },
    })
      .then(({ data }) => {
        setChatsHistory(data.user.chats.reverse());
      })
      .catch((error) => {
        console.log("Error occured: ", error.message);
      });
  }, [user]);

  return { chatsHistory, setChatsHistory };
};

export default useChatsHistory;
