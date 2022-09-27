import { CalendarIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Navbar from "../nav/Navbar";
import LineChart from "./LineChart";

import "../../css/style.css";
import { useState, ChangeEvent } from "react";
import React from "react";
import { fetchChartData } from "../../actions/mealAction";
import { ChartComponent } from "../../interfaces";


const History = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [chartData, setChartData] = useState<ChartComponent[] | undefined>([]);
  const getChartData = async (event: ChangeEvent<HTMLInputElement>) => {
    //validate

    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    setEndDate(event.target.value);
    const data = await fetchChartData(
      new Date(startDate),
      new Date(event.target.value),
      headers
    );

    setChartData(data);
  };
  return (
    <div className="flex w-[80vw] bg-white flex-col">
      <Navbar title="Charts" />
      <div className="flex flex-col  h-full p-5 bg-[#F8F8F8] space-y-8 ">
        <div className="flex flex-row w-full justify-center space-x-[5vw]  ">
          <div className="flex flex-row items-center space-x-6 ">
            <p className="">Enter first date</p>
            <InputGroup width={{ md: "14vw" }}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="gray.300" />}
              />
              <Input
                backgroundColor="white"
                type="date"
                placeholder="Enter date"
                onChange={(e) => setStartDate(e.currentTarget.value)}
              />
            </InputGroup>
          </div>
          <div className="flex flex-row items-center space-x-6">
            <p>Enter last date</p>
            <InputGroup width={{ md: "14vw" }}>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color="gray.300" />}
              />
              <Input
                backgroundColor="white"
                type="date"
                placeholder="Enter date"
                onChange={getChartData}
              />
            </InputGroup>
          </div>
        </div>

        
        <div className="flex bg-white p-8 space-y-10 flex-col w-[60vw] rounded-lg justify-between self-center">
          <p className="text-lg font-jakarta font-semibold ">
            Macro nutrient consumption from {startDate} to {endDate}
          </p>
          <LineChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default History;
