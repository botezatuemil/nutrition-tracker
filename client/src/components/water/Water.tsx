import React, { useState } from "react";
import Navbar from "../nav/Navbar";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Services from "./Services";
import Chart from "./Chart";
import ModalOption from "./ModalOption";

const Water = () => {

  const [showGoal, setShowGoal] = useState<boolean>(false);
  const [showAddDrink, setShowAddDrink] = useState<boolean>(false);
  return (
    <div className="overflow-hidden flex w-[80vw] min-h-screen bg-ocean-pattern bg-cover flex-col">
      <Navbar title="Water" />
      <div className="flex flex-row h-full">
        <Services setShowGoal={setShowGoal} setShowAddDrink={setShowAddDrink}/>
        <Chart/>
      </div>
      {showGoal  && !showAddDrink &&  <ModalOption title="Edit current goal" setShowGoal={setShowGoal} show={showGoal}/>}
      {showAddDrink && !showGoal && <ModalOption title="Add drink" setShowGoal={setShowAddDrink}  show={showGoal}/>}
    </div>
  );
};

export default Water;
