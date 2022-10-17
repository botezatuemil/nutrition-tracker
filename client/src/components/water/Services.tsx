import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { getWater, getWaterGoal } from '../../actions/waterAction';
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const Services : React.FC<{  setShowGoal : Dispatch<SetStateAction<boolean>>, setShowAddDrink : Dispatch<SetStateAction<boolean>> }> = (props) => {
  
  const dispatch = useAppDispatch();

  const goal = useAppSelector(state => state.water);
  const drinkedWater = useAppSelector(state => state.drinkedWater);
  
  useEffect(() => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    dispatch(getWaterGoal(headers));
    dispatch(getWater(headers));
   
  }, [])
  

  return (
    <div className="flex flex-col w-[25vw]  items-center py-10 justify-between">
          <div className="flex flex-row space-x-2 ">
            <p className="text-3xl font-bold font-Jakarta">Hydration</p>
            <p className="text-3xl font-Jakarta">Factors</p>
          </div>

          <button className="w-[10vw] bg-[#51DBFE] h-[8vh] border-l-4 rounded-tr-lg rounded-br-lg flex justify-between px-5 items-center flex-row">
            <p className="text-white font-Jakarta text-lg">Goal</p>
            <p className="text-white font-semibold font-Jakarta text-lg">
              {goal} L
            </p>
          </button>

          <div className="w-[12vw]">
            <CircularProgressbarWithChildren
              value={drinkedWater}
              maxValue={goal} 
              strokeWidth={4}
              styles={buildStyles({
                pathTransitionDuration: 0.5,
                pathColor: drinkedWater < goal ? "rgba(255, 255, 255, 1)" : "rgb(255, 96, 96)",
                trailColor:  "rgba(255, 255, 255, 0.3)",
              })}
            >
              <p className="text-white font-Jakarta font-semibold text-3xl">
              {drinkedWater} L
              </p>
              <p className="text-white font-Jakarta text-xs">left to drink</p>
            </CircularProgressbarWithChildren>
          </div>
          <div className="flex space-y-4 flex-col">
            <p className="text-white text-md font-Jakarta font-semibold text-center">
              Additional functions
            </p>
            <div className="flex flex-row w-full justify-center space-x-4">
              <button onClick={() => {props.setShowGoal(true); props.setShowAddDrink(false)}} className="rounded-md  bg-[#255BD2] text-white font-Jakarta py-3 px-4 hover:bg-[#0088EC]">
                Edit Goal
              </button>
              <button onClick={() => {props.setShowAddDrink(true); props.setShowGoal(false);}} className="rounded-md  bg-[#255BD2] text-white font-Jakarta py-3 px-4 hover:bg-[#0088EC]">
                Add Drink
              </button>
            </div>
          </div>
        </div>
  )
}

export default Services