import React from 'react'
import {Nutrients} from '../../interfaces';

const Footer: React.FC<{text: string, name: string, nutrients: Nutrients}> = (props) => {

  return (
    <div className={`w-full min-h-[8vh] flex flex-row items-center ${props.name === "Remaining" ? "bg-[#FEC0C1]" : "bg-white" }`} >
    <div className="w-[25vw]  h-full flex flex-row items-center ml-[4vw] ">
      <p className={`font-bold font-jakarta text-xs w-[8vw] ${props.text}`}>
        {props.name}
      </p>
    
    </div>
    
    <div className="w-full flex flex-row  mr-[3vw] ml-[18vw]">
      <div className="h-full w-[6vw] text-left flex flex-row items-center px-2 ">
        <p className={`font-semibold font-jakarta text-xs  `}>
        {props.nutrients.calories}
        </p>
        
      </div>
      <div className=" h-full w-[5vw] text-left flex flex-row items-center  ">
        <p className="font-semibold font-jakarta text-xs ">
        {props.nutrients.protein}
        </p>
       
      </div>
      <div className="  h-full w-[5vw] text-left flex flex-row items-center ">
        <p className="font-semibold font-jakarta text-xs ">
        {props.nutrients.carbs}
        </p>
       
      </div>
      <div className="  h-full w-[5vw] text-left flex flex-row items-center ">
        <p className="font-semibold font-jakarta text-xs ">
        {props.nutrients.fat}
        </p>
        
      </div>
      <div className=" h-full w-[5vw] text-left flex flex-row items-center ">
        <p className="font-semibold font-jakarta text-xs ">
        {props.nutrients.sugar}
        </p>
        
      </div>
    </div>
  </div>
  )
}

export default Footer