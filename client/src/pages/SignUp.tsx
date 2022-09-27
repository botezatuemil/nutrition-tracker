import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/userAction";
import Auth from "../components/authentification/Auth";
import InfoSection from "../components/authentification/InfoSection";
import { User } from "../interfaces/index";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignUp = async (user: User) => {

    const res = await registerUser(user);

    if (res?.status === 201) {
      toast({
        title: res?.data,
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
        containerStyle: {
          marginLeft: "25%",
        },
      });
    }
    if (res?.status === 202) {
      toast({
        title: res?.data,
        description: "Please login",
        status: "error",
        duration: 2000,
        isClosable: true,
        containerStyle: {
          marginLeft: "25%",
        },
      });
    }

    setTimeout(() => {
      navigate("../login", { replace: true });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <InfoSection
        title={"Already have an account?"}
        subtitle={
          "Sign in and calculate your macros and unlock your full potential "
        }
        buttonAction={"Sign In"}
      />
      <Auth
        title={"Sign Up To Your Account"}
        buttonAction={"Sign Up"}
        handleSign={handleSignUp}
      />
    </div>
  );
};

export default SignUp;
