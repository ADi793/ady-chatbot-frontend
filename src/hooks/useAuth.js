import { jwtDecode } from "jwt-decode";
import { AUTH_KEY } from "../utils/constants";
import { getFromLocalStorage } from "../utils/localStorage";
import { useEffect, useState } from "react";

const useAuth = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);
  return authToken ? jwtDecode(authToken) : null;
};

export default useAuth;
