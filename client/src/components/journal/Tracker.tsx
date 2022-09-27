import React from "react";
import Header from "./Header";
import MealTracker from "./MealTracker";

const Tracker: React.FC<{
 
  selectIndex: (id: number) => void;
  index: number;
  meals: string[] | undefined;
  nutrients: string[] | undefined;
}> = (props) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#F2F4F6]">
      <Header nutrients={props.nutrients} selectIndex={props.selectIndex} index={props.index} />
      <MealTracker
        meals={props.meals}
        nutrients={props.nutrients}
        index={props.index}
      />
    </div>
  );
};

export default Tracker;
