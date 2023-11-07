import { Button, HStack, Heading, Icon } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { removeFromLocalStorage } from "../utils/localStorage";
import { AUTH_KEY } from "../utils/constants";
import { googleLogout } from "@react-oauth/google";
import { SiChatbot } from "react-icons/si";

const Navbar = () => {
  const user = useAuth();

  const handleLogout = () => {
    googleLogout();
    removeFromLocalStorage(AUTH_KEY);
    window.location = "/auth/login";
  };

  useEffect(() => {}, [useAuth()]);

  return (
    <HStack
      paddingY="10px"
      paddingX="15px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to="/">
        <Heading as="h2">ChatBot</Heading>
      </Link>
      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Icon as={SiChatbot} boxSize={8} />
      )}
    </HStack>
  );
};

export default Navbar;
