import React, { useState } from "react";
import Navbar from "../nav/Navbar";
import Profile from "./Profile";
import Result from "./Result";

const Calculator = () => {
  const [update, setUpdate] = useState<boolean>(false);
console.log(update);

  return (
    <div className="flex flex-col w-[80vw] bg-[#F2F4F6] ">
      <Navbar title={"Macros Calculator"} />
      <div className="flex flex-row h-full ">
        <Profile setUpdate={setUpdate} update={update} />
        <Result update={update} />
      </div>
    </div>
  );
};

export default Calculator;
