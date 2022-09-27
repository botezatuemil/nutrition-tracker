import React, {ChangeEvent, useEffect, useState} from 'react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { MealTable } from '../../interfaces'
import { useAppDispatch } from '../../store/hooks'
import { addChecked, removeChecked } from '../../store/checkedMeals'

const MealRow : React.FC<{ mealUnsplitted : string,  valueMeals: string[], valueNutrients: string | undefined}>= (props) => {

  const nutrients = props.valueNutrients?.split(/[(,)]/)
  const [isChecked, setChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // console.log(props.mealUnsplitted)
  // console.log(props.valueNutrients);

  useEffect(() => {
    
    if (isChecked) {
      console.log(props.mealUnsplitted)
      dispatch(addChecked(props.mealUnsplitted));
    } else {
      dispatch(removeChecked(props.mealUnsplitted));
    }
  
  }, [isChecked])

  useEffect(() => {
    setChecked(false);
  }, [props.mealUnsplitted])
  
  


  return (
    <div className="w-full min-h-[8vh] overflow-x-hidden flex flex-row bg-white items-center justify-between">
      <div className='flex flex-row'>
      <div className="w-[4vw] items-center justify-center h-full flex">
        <Checkbox size='lg' className="mx-4" colorScheme="messenger" isChecked={isChecked}  onChange={(event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked)}  />
      </div>

      <div className="w-[8vw]  h-full flex flex-row  ml-4 ">
        <p className="font-semibold truncate  font-jakarta text-xs ">
          {props.valueMeals && props.valueMeals[2]}
        </p>
      </div>
      </div>

      <div className=" h-full flex flex-row w-[10vw] ml-[4vw]  ">
        <p className="font-semibold font-jakarta text-xs  text-left  ">
         {props.valueMeals && props.valueMeals[4]}
        </p>
      </div>

      <div className="w-full flex flex-row  ml-[13vw] justify-between">
        <div className="h-full w-[5.5vw] text-left flex flex-row items-center  ">
          <p className="font-semibold font-jakarta text-xs ">
          {nutrients && nutrients[2]}
          </p>
          
        </div>
        <div className=" h-full w-[5vw] text-left  flex flex-row items-center  ">
          <p className="font-semibold font-jakarta text-xs ">
          {nutrients && nutrients[3]}
          </p>
         
        </div>
        <div className="  h-full w-[5vw] flex text-left  flex-row items-center ">
          <p className="font-semibold font-jakarta text-xs ">
          {nutrients && nutrients[4]}
          </p>
         
        </div>
        <div className="  h-full w-[5vw] flex text-left  flex-row items-center ">
          <p className="font-semibold font-jakarta text-xs ">
          {nutrients && nutrients[5]}
          </p>
          
        </div>
        <div className=" h-full w-[5vw] flex text-left  flex-row items-center ">
          <p className="font-semibold font-jakarta text-xs ">
          {nutrients && nutrients[6]}
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default MealRow