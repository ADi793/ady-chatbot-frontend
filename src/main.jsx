import router from "./routes.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <GoogleOAuthProvider clientId="114098529771-h78qkpk1k963tthdqvblcadmiofsjvfc.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </ChakraProvider>
);
