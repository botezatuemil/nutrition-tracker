import React from "react";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
const HeaderTable = () => {
  return (
    <div className="w-full min-h-[8vh] flex flex-row">
      <div className="w-[4vw] items-center  h-full flex">
        <CheckIcon className="mx-4" />
      </div>
      <div className=" w-full flex ">
      <div className="w-[10vw]  h-full flex flex-row items-center ml-4">
        <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
          PRODUCTS
        </p>
        <ChevronDownIcon />
      </div>
      <div className="w-[5vw]  h-full flex flex-row items-center ">
        <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
          AMOUNT
        </p>
        <ChevronDownIcon />
      </div>
      
        <div className="h-full flex flex-row items-center text-left ml-[11vw] w-[5vw] ">
          <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
            KCAL
          </p>
          <ChevronDownIcon />
        </div>
        <div className=" h-full flex flex-row items-center text-left  w-[5vw] ">
          <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
            PROTEIN
          </p>
          <ChevronDownIcon />
        </div>
        <div className="  h-full flex flex-row items-center text-left  w-[5vw] ">
          <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
            CARBS
          </p>
          <ChevronDownIcon />
        </div>
        <div className="  h-full flex flex-row items-center text-left  w-[5vw] ">
          <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
            FAT
          </p>
          <ChevronDownIcon />
        </div>
        <div className=" h-full flex flex-row items-center text-left  w-[5vw] ">
          <p className="font-semibold font-jakarta text-xs text-[#BBBDD2]">
            SUGAR
          </p>
          <ChevronDownIcon />
        </div>
      </div>
      </div>
    
  );
};

export default HeaderTable;
