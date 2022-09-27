import { CalendarIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { LineChart } from "../../interfaces";
import AreaChart from "./AreaChart";
import {fetchWaterData} from "../../actions/waterAction";

const Chart = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [waterData, setWaterData] = useState<LineChart[]>();
  const getChartData = async (event: ChangeEvent<HTMLInputElement>) => {
    //validate

    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    setEndDate(event.target.value);
   
    const data = await fetchWaterData(
      new Date(startDate),
      new Date(event.target.value),
      headers
    );

    setWaterData(data);
  };

  return (
    <div className="w-[55vw] flex h-full flex-col justify-center space-y-5">
      <div className="flex flex-row w-full justify-center space-x-[5vw] mt-[15vh]">
        <div className="flex flex-row items-center space-x-6 ">
          <p className="text-white font-Jakarta">Enter first date</p>
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
          <p className="text-white font-Jakarta">Enter last date</p>
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
      <div className="flex bg-white p-8 space-y-10 flex-col w-[50vw] h-[60vh] rounded-lg justify-between self-center ">
        <p className="text-lg font-Jakarta font-semibold ">
          Water drinked from {startDate} to {endDate}
        </p>
        <AreaChart waterData={waterData}/>
      </div>
    </div>
  );
};

export default Chart;
