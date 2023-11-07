import { GoogleLogin } from "@react-oauth/google";
import { Box, useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { setToLocalStorage } from "../utils/localStorage";
import { AUTH_KEY, UNEXPECTED_ERROR } from "../utils/constants";
import apiClient from "../services/apiClient";
import getToastConfig from "../utils/getToastConfig";

function Login() {
  const toast = useToast();

  const onSucess = async (credentialResponse) => {
    try {
      const { name, email } = jwtDecode(credentialResponse.credential);
      const { data } = await apiClient.post("/user/auth", { name, email });

      setToLocalStorage(AUTH_KEY, data.auth_token);
      window.location = "/";
    } catch (error) {
      toast(getToastConfig(UNEXPECTED_ERROR));
    }
  };

  const onError = () => {
    toast(getToastConfig(UNEXPECTED_ERROR));
  };

  return (
    <Box
      as="main"
      h="calc(100vh - 63px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <GoogleLogin onSuccess={onSucess} onError={onError} auto_select={false} />
    </Box>
  );
}

export default Login;
