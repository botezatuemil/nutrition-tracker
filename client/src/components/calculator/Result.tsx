import React, { useState, useEffect } from "react";
import MacroChart from "./Chart";
import MacroLabel from "./MacroLabel";
import { getMacros } from "../../actions/userAction";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Nutrients } from "../../interfaces";

const Result : React.FC<{update: boolean}> = (props) => {

  const dispatch = useAppDispatch();
  const nutrientsUser = useAppSelector(state => state.user);

  
  useEffect(() => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!
    }

    dispatch(getMacros(headers))
  }, [dispatch, props.update]);
  
  return (
    <div className="flex flex-col items-center w-full h-full ">
      <p className="font-bold font-jakarta text-2xl mt-[2vh]">
        Your Daily Macro Goals
      </p>
      <div className="w-full flex flex-col  ">
        <MacroChart
          protein={nutrientsUser.protein}
          fat={nutrientsUser.fat}
          carbs={nutrientsUser.carbs}
          calories={nutrientsUser.calories}
        />
        <div className="flex flex-row w-full justify-between px-4">
          <MacroLabel icon="protein" kcal={nutrientsUser.protein} />
          <MacroLabel icon="fat" kcal={nutrientsUser.fat} />
          <MacroLabel icon="carbs" kcal={nutrientsUser.carbs} />
        </div>
      </div>
    </div>
  );
};

export default Result;
