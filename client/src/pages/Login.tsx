import { useToast } from "@chakra-ui/react";
import { Router } from "@mui/icons-material";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { loginUser } from "../actions/userAction";
import { registerUser } from "../api/routes";

import Auth from "../components/authentification/Auth";
import InfoSection from "../components/authentification/InfoSection";
import { User } from "../interfaces";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
 

  const handleSignIn = async (user: User) => {
    const res = await loginUser(user);
    if (res?.status === 201 || res?.status === 202) {
      toast({
        title: res?.data,
        status: "error",
        duration: 2000,
        isClosable: true,
        containerStyle: {
          marginLeft: "25%",
        },
      });
      return;
    }
    else {
      localStorage.setItem("token",   res?.data);
      navigate("../macro-calculator", { replace: true });
      
    }
    

  };
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <InfoSection
        title={"New here?"}
        subtitle={
          "Sign up and calculate your macros and unlock your full potential"
        }
        buttonAction={"Sign Up"}
      />
      <Auth
        title={"Sign In To Your Account"}
        buttonAction={"Sign In"}
        handleSign={handleSignIn}
      />
    </div>
  );
};

export default Login;
