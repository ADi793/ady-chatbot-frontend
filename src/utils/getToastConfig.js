const getToastConfig = ({ title, description, status }) => {
  return {
    title,
    description,
    status: status ? status : "success",
    duration: 1500,
    isClosable: true,
  };
};

export default getToastConfig;
