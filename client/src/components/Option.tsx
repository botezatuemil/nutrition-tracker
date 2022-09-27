import React from "react";

const Option: React.FC<{text: string, setSelected: React.Dispatch<React.SetStateAction<Boolean>>, selected: Boolean, cleanupFunction: () => void}> = (props) => {
  return (
    <div className={`flex w-full h-[8vh] hover:bg-split-green hover:text-lg ${props.selected && "bg-split-green text-lg"}`} onClick={() => {props.cleanupFunction();props.setSelected(true); }}>
      <div className="flex  items-center mx-[5vw]  cursor-pointer w-full">
        <div className="font-jakarta font-semibold">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Option;
