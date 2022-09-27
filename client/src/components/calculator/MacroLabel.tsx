import React from 'react'
import {IoFish} from 'react-icons/io5';
import {FaAppleAlt} from 'react-icons/fa';
import {GiHamburger} from  'react-icons/gi'
const MacroLabel: React.FC<{ kcal : number, icon : string}> = (props) => {
  return (
    <div className='flex flex-row items-center justify-center w-[9vw] h-[8vh]  bg-white space-x-4 '>
        <div className={`w-[2vw] h-[2vw] bg-[#EDF7FF] justify-center items-center flex ${props.icon === 'protein' ? "bg-[#EDF7FF]" : props.icon === 'carbs' ? "bg-[#FDFAE8]" : "bg-[#FEEDF1]"} `}>
          {props.icon === 'protein' ? <IoFish/> : props.icon === 'carbs' ? <FaAppleAlt/> : <GiHamburger/>}
        </div>
        <div className='flex flex-col'>
          <p className='text-md font-jakarta font-semibold'>{props.kcal}</p>
          <p className='text-[10px]'>Avg {props.icon}</p>
        </div>

    </div>
  )
}

export default MacroLabel