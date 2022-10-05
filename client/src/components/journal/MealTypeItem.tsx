import React, { Dispatch, RefObject, SetStateAction, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AllMeals, Type } from "../../interfaces";

const MealTypeItem: React.FC<{
  meals: string,
  id: number;
  hour: Date;
  type: Type;
  index: number;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>
  selectIndex: (id: number) => void;
}> = (props) => {

  const handleClick = () => {
    props.setSelectedIndex(props.index);
    props.selectIndex(props.id);
  };


  let countMeals = 0;

  if (props.meals !== null)
    countMeals = props.meals.split(":").length;

  return (
    <div
      className={`flex  w-full min-h-[20vh] cursor-pointer justify-center flex-col px-10  ${
        props.selectedIndex === props.index ? "bg-white" : "bg-[#EBF0F8]"
      }`}
      onClick={handleClick}
    >
      <p className="font-jakarta font-semibold text-sm">
        {new Date(props.hour).getHours()} : {new Date(props.hour).getMinutes()}
      </p>
      <p className="font-jakarta font-semibold text-2xl">
        {props.type.toString().charAt(0) +
          props.type.toString().slice(1).toLocaleLowerCase()}
      </p>
      <p className="font-jakarta text-[#B5BAD2]">Added {countMeals} meals</p>
    </div>
  );
};

export default MealTypeItem;
