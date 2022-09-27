import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

import { Profile as UserProfile, Goal, Activity, Nutrients } from "../../interfaces";
import {calorieIntake, proteinIntake, carbsIntake, fatIntake, sugarIntake } from  '../../utilities/MacroCalculatorFormula'
import { createUserProfile } from "../../actions/userAction";
import { SetState } from "immer/dist/internal";


const Profile : React.FC<{setUpdate : Dispatch<SetStateAction<boolean>>, update: boolean}> = (props) => {
  const [gender, setGender] = useState<boolean>(false);
  const [goal, setGoal] = useState<Goal>(Goal.LOSE);
  const [activity, setActivity] = useState<Activity>(Activity.MODERATE);
  
  const [sliderAgeValue, setSliderAgeValue] = React.useState(21);
  const [sliderHeightValue, setSliderHeightValue] = React.useState(180);
  const [sliderWeightValue, setSliderWeightValue] = React.useState(78);

  const [showTooltip, setShowTooltip] = React.useState(false);

  const createProfile = () => {

    const profile : UserProfile = {
      gender,
      weight: sliderWeightValue,
      age: sliderAgeValue,
      height: sliderHeightValue,
      goal,
      activity,
    }
    
    const nutrients : Nutrients = {
      calories: calorieIntake(profile),
      protein: proteinIntake(profile),
      carbs: carbsIntake(profile),
      sugar: sugarIntake(profile),
      fat: fatIntake(profile)
    }

    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    createUserProfile(profile, nutrients, headers);
    props.setUpdate(prev => !prev);
    
  }

  return (
    <div className="flex bg-white h-full w-[50vw] px-[4vw] flex-col  justify-between">
      <div className="flex flex-col">
        <h1 className="font-semibold font-jakarta text-[30px]">
          Calculate your macros
        </h1>
        <p className="text-[#535353] font-jakarta text-[13px]">
          Craft your ideal macronutrient ratio now using our macros calculator
        </p>
      </div>

     {/* First button */}
      
        <div className="flex flex-col font-jakarta  space-y-2 ">
          <p className="font-jakarta text-[#535353] text-[13px]">I'm a</p>
          <div className="flex flex-row w-full">
            <button
              className={`font-jakarta font-semibold  bg-[#F2F4F6] w-[12vw] h-[6vh]  rounded-l-md ${
                !gender && "bg-[#ABC5A3] rounded-r-md"
              }`}
              onClick={() => setGender(false)}
            >
              Male
            </button>
            <button
              className={`font-jakarta font-semibold focus: bg-[#F2F4F6]  w-[12vw] h-[6vh] rounded-r-md ${
                gender && "bg-[#ABC5A3] rounded-l-md"
              }`}
              onClick={() => setGender(true)}
            >
              Female
            </button>
          </div>
        </div>

      {/* Second button */}
        <div className="flex flex-col space-y-2 ">
          <p className="font-jakarta text-[#535353] text-[13px]">
            What is your main weight goal?
          </p>
          <div className="flex flex-row w-full">
            <button
              className={`font-jakarta font-semibold  bg-[#F2F4F6] w-[12vw] h-[6vh]  rounded-l-md ${
                goal === Goal.LOSE && "bg-[#ABC5A3] rounded-r-md"
              }`}
              onClick={() => setGoal(Goal.LOSE)}
            >
              Lose
            </button>
            <button
              className={`font-jakarta font-semibold focus: bg-[#F2F4F6]  w-[12vw] h-[6vh] rounded-r-md ${
                goal === Goal.MANTAIN && "bg-[#ABC5A3] rounded-l-md"
              }`}
              onClick={() => setGoal(Goal.MANTAIN)}
            >
              Mantain
            </button>
            <button
              className={`font-jakarta font-semibold focus: bg-[#F2F4F6]  w-[12vw] h-[6vh] rounded-r-md ${
                goal === Goal.GAIN && "bg-[#ABC5A3] rounded-l-md"
              }`}
              onClick={() => setGoal(Goal.GAIN)}
            >
              Gain
            </button>
          </div>
        </div>
      

      {/* Slider container */}
      <div>
        <div className="flex flex-col space-y-[4vh]">
          <div>
            <p className="font-jakarta text-[#535353] text-[13px]">
              I'm {sliderAgeValue} years old
            </p>
            <Slider
              defaultValue={sliderAgeValue}
              min={0}
              max={100}
              onChange={(v) => setSliderAgeValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderTrack>
                <SliderFilledTrack bg="#ABC5A3" />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="#7F8D7A"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderAgeValue}`}
              >
                <SliderThumb bg="#7F8D7A" height={"20px"} width={"20px"} />
              </Tooltip>
            </Slider>
          </div>

          <div>
            <p className="font-jakarta text-[#535353] text-[13px]">
              My height is {sliderHeightValue} cm
            </p>
            <Slider
              defaultValue={sliderHeightValue}
              min={100}
              max={280}
              onChange={(v) => setSliderHeightValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderTrack>
                <SliderFilledTrack
                  bg="#ABC5A3"
                  height={"20px"}
                  width={"20px"}
                />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="#7F8D7A"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderHeightValue}`}
              >
                <SliderThumb bg="#7F8D7A" height={"20px"} width={"20px"} />
              </Tooltip>
            </Slider>
          </div>

          <div>
            <p className="font-jakarta text-[#535353] text-[13px]">
              My weight is {sliderWeightValue} kg
            </p>
            <Slider
              defaultValue={sliderWeightValue}
              min={0}
              max={300}
              onChange={(v) => setSliderWeightValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderTrack>
                <SliderFilledTrack bg="#ABC5A3" />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="#7F8D7A"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderWeightValue}`}
              >
                <SliderThumb bg="#7F8D7A" height={"20px"} width={"20px"} />
              </Tooltip>
            </Slider>
          </div>
        </div>
      </div>


      {/* Activity button */}
      <div className="flex flex-col space-y-2 ">
        <p className="font-jakarta text-[#535353] text-[13px]">
          Activity level
        </p>
        <div className="flex flex-row  m-auto">
          <button
            className={`font-jakarta font-semibold  bg-[#F2F4F6] w-[14vw] h-[8vh]  rounded-l-md ${
              activity === Activity.SEDENTARY && "bg-[#ABC5A3] rounded-r-md"
            }`}
            onClick={() => setActivity(Activity.SEDENTARY)}
          >
            <div className="flex flex-col">
              <p className="text-sm  4k:text-3xl">Sedentary</p>
              <p className="text-[10px] text-[#535353]">(no exercise)</p>
            </div>
          </button>
          <button
            className={`font-jakarta font-semibold focus: bg-[#F2F4F6] w-[14vw] h-[8vh] rounded-r-md ${
              activity === Activity.MODERATE && "bg-[#ABC5A3] rounded-l-md"
            }`}
            onClick={() => setActivity(Activity.MODERATE)}
          >
            <div className="flex flex-col">
              <p className="text-sm">Moderate</p>
              <p className="text-[10px]">(3x-4x per week)</p>
            </div>
          </button>
          <button
            className={`font-jakarta font-semibold focus: bg-[#F2F4F6]  w-[14vw] h-[8vh] rounded-r-md ${
              activity === Activity.ACTIVE && "bg-[#ABC5A3] rounded-l-md"
            }`}
            onClick={() => setActivity(Activity.ACTIVE)}
          >
            <div className="flex flex-col">
              <p className="text-sm hd:text-xl">Active</p>
              <p className="text-[10px]">(5x+ per week)</p>
            </div>
          </button>
        </div>
        
      </div>

      {/* Calculator button */}
      <button className="h-[8vh] bg-[#ABC5A3] rounded-md w-full font-semibold font-jakarta text-lg mb-[2vh] " onClick={createProfile}>
          Calculate macros
        </button>
    </div>
  );
};

export default Profile;
