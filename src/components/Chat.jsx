import { Avatar, HStack, Icon, Text } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import React from "react";
import { SiChatbot } from "react-icons/si";

const Chat = ({ chat }) => {
  return (
    <>
      <HStack paddingY="12px" paddingLeft={6} paddingRight={2}>
        <Avatar
          borderRadius="12px"
          size="md"
          name="Adil Siddiqui"
          colorScheme="green.800"
          display="flex"
          alignSelf="start"
        />
        <Text fontWeight="normal">{chat.question}</Text>
      </HStack>
      <hr />
      <HStack bg="gray.100" paddingY="12px" paddingLeft={6} paddingRight={2}>
        <Icon as={SiChatbot} boxSize={12} alignSelf="start" />
        {chat.answer ? (
          <Text
            fontWeight="normal"
            as="pre"
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {chat.answer}
          </Text>
        ) : (
          <BeatLoader size={10} color="white" />
        )}
      </HStack>
      <hr />
    </>
  );
};

export default Chat;
