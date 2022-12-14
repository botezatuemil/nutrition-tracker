import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/icons/Logo";
import Option from "../components/Option";
import Settings from "../components/icons/Settings";
import Logout from "../components/icons/Logout";
import Calculator from "../components/calculator/Calculator";
import Journal from "../components/journal/Journal";
import Recipes from "../components/recipes/Recipes";
import Water from  "../components/water/Water";
import History from "../components/history/History";

const Macro = () => {
  const [macros, setMacros] = useState<Boolean>(true);
  const [journal, setJournal] = useState<Boolean>(false);
  const [recipes, setRecipes] = useState<Boolean>(false);
  const [water, setWater] = useState<Boolean>(false);
  const [history, setHistory] = useState<Boolean>(false);
  const [isAuthentificated, setIsAuthentificated] = useState<Boolean>(true);

  const navigate = useNavigate();

  const cleanup = () => {
    setMacros(false);
    setJournal(false);
    setRecipes(false);
    setWater(false);
    setHistory(false);
  };

  const logout = () => {
    navigate('/login');
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token === null) {
      setIsAuthentificated(false);
    }
  }, [])
  
  return (
    
    <div className="flex w-full min-h-screen bg-white ">
      {isAuthentificated ? (
        <>
        <div className="flex w-[20vw]  bg-[#F2F4F6] items-center flex-col justify-between ">
        <div className="flex justify-center flex-row items-center h-[10vh] space-x-4">
          <Logo width={50} height={50} />
          <p className="font-bold font-jakarta text-xl ">NutriTrack</p>
        </div>

        <div className="mt-[60px] w-full ">
          <Option
            text="Macro Calculator"
            setSelected={setMacros}
            selected={macros}
            cleanupFunction={cleanup}
          />
          <Option
            text="Journal"
            setSelected={setJournal}
            selected={journal}
            cleanupFunction={cleanup}
          />
          <Option
            text="Recipes"
            setSelected={setRecipes}
            selected={recipes}
            cleanupFunction={cleanup}
          />
          <Option
            text="Water"
            setSelected={setWater}
            selected={water}
            cleanupFunction={cleanup}
          />
          <Option
            text="History"
            setSelected={setHistory}
            selected={history}
            cleanupFunction={cleanup}
          />
          
        </div>

        <div className="flex flex-col w-full mt-[130px]  ">
          <div className=" flex-row flex space-x-3 h-[6vh] ml-[2.5vw] items-center">
            <Logout width={25} height={25} />
            <button onClick={logout} className="font-jakarta font-semibold cursor-pointer">Log out</button>
          </div>
        </div>
      </div>

      {macros && <Calculator/>}
      {journal && <Journal/>}
      {recipes && <Recipes/>}
      {water && <Water/>}
      {history && <History/>}

        </>
      ) : (
        <div className="flex items-center flex-col justify-center w-full">
          <p className="font-jakarta text-3xl">Not Found 404</p>
          <p className="font-jakarta ">It looks like your page was not found </p>
        </div>

      )}
      
    </div>
  );
};

export default Macro;
