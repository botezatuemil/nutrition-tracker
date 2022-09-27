import React, { useState } from "react";
import PasswordIcon from "../icons/PasswordIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useLocation } from "react-router-dom";
import { User } from  '../../interfaces/index';
import { registerUser } from "../../actions/userAction";
import { useToast } from "@chakra-ui/react";

const Auth: React.FC<{ title: string; buttonAction: string; handleSign: (user : User) => void}> = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>("password");
  const [outline, setOutline] = useState<string>("outline-0");
  const { pathname } = useLocation();
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const passwordHandler = () => {
    setIsPasswordVisible((prevState) => !prevState);
    !isPasswordVisible ? setType("text") : setType("password");
  };



  const handleSignUser = (event: React.FormEvent) => {
    event.preventDefault();

    const user : User = {
      fullname : fullname,
      email: email,
      password : password
    }
    
     props.handleSign(user);
    
  }

  return (
    <form className="flex bg-white col-span-3 flex-col items-center">
      <h1 className="font-Jakarta font-semibold text-5xl mt-[20vh]">
        {props.title}
      </h1>
      <div className="mt-[20vh] w-7/12 flex flex-col space-y-[3vh]">
        {pathname === "/signup" && (
          <input
            className="bg-[#F2F4F6] p-4 font-Jakarta text-black rounded-full text-xs px-10"
            placeholder="Enter your full name"
            onChange={(e : React.FormEvent<HTMLInputElement>) => setFullname(e.currentTarget.value)}
          />
        )}

        <input
          className="bg-[#F2F4F6] p-4 font-Jakarta text-black rounded-full text-xs px-10"
          placeholder="Enter your email address"
          type="email"
          onChange={(e : React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
        />
        <div
          className={`bg-[#F2F4F6] rounded-full flex flex-row items-center justify-between px-[3vh] outline-[#0060DF] outline ${outline}`}
        >
          
          <input
            className="bg-[#F2F4F6] p-4 font-Jakarta text-black rounded-full text-xs outline-none"
            placeholder="Enter your password"
            type={type}
            onBlur={() => setOutline("outline-0")}
            onClick={() => setOutline("outline-2")}
            onChange={(e : React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
          />
          {isPasswordVisible ? (
            <div className="cursor-pointer" onClick={passwordHandler}>
              <VisibilityIcon />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={passwordHandler}>
              <VisibilityOffIcon />
            </div>
          )}
        </div>

        {pathname === '/login' && 
          <p className="text-[#535353] place-self-end text-xs cursor-pointer font-Jakarta font-semibold">Forgot password?</p>
        }
      </div>
      <button className="bg-[#535353] w-3/12 p-3 text-white text-xs rounded-full mt-[10vh]" onClick={handleSignUser}>
        {props.buttonAction}
      </button>
      
    </form>
  );
};

export default Auth;
