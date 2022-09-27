import React, {useState, useEffect, useCallback} from "react";
import Logo from "../icons/Logo";
import { useLocation, Link } from "react-router-dom";
import { loginUser, registerUser } from "../../actions/userAction";
import { User }from '../../interfaces/index';

const InfoSection: React.FC<{title: string, subtitle: string, buttonAction: string}> = (props) => {

  const { pathname } = useLocation();
  const [route, setRoute] = useState<string>('');

  const handleChangeAuth = useCallback(() => {
    pathname === '/login' ? setRoute('/signup') : setRoute('/login')
  }, [pathname]);

  

  useEffect(() => {
    handleChangeAuth();
  }, [handleChangeAuth])



  return (
    <div className="flex bg-[#EBF9E7] items-center flex-col">
      <div className="flex flex-row h-[67px] mt-[5vh] ">
       <Logo width={67} height={65}/>
       <h1 className="place-self-center font-Jakarta font-semibold text-xl">NutriTrackr</h1>
      </div>

      <p className="font-Jakarta font-bold text-2xl mt-[40vh] text-center">{props.title}</p>
      <p className="font-Jakarta text-[#535353] text-center text-xs px-[70px] mt-[1vh]">{props.subtitle}</p>
      <Link to={route} className="bg-[#ABC5A3] w-7/12 mt-[10vh] p-2 font-Jakarta  text-white rounded-full text-xs text-center" >{props.buttonAction}</Link>
    </div>
  );
};

export default InfoSection
