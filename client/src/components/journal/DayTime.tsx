import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import MealTypeItem from "./MealTypeItem";
import { AllMeals, DateTime, MealType, Type } from "../../interfaces";
import { createJournal } from "../../actions/userAction";
import { getDatasetAtEvent } from "react-chartjs-2";
import { getMealTypes } from "../../actions/mealAction";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const DayTime : React.FC<{selectIndex : ( id: number) => void, setHasMeal: Dispatch<SetStateAction<boolean>>}> = (props) => {

  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString().toString()
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const meals = useAppSelector((state) => state.meal);


  const addNewMealType = (mealType: Type) => {
    const now: Date = new Date();

    const meal: MealType = {
      id: Math.random(),
      type: mealType,
      hour: now,
      journalId: 1,
    };
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    const dateTime: DateTime = {
      date: new Date(date),
    };

    dispatch(createJournal(meal, dateTime, headers));
    
  };

  const getData = (e: React.FormEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
    props.setHasMeal(false);
    setSelectedIndex(-1);
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    const dateNow: DateTime = {
      date: new Date(e.currentTarget.value),
    };
    dispatch(getMealTypes(dateNow, headers));
  };

  useEffect(() => {
    
    const currentDate: string =
      new Date().getFullYear() +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2);

    setDate(currentDate);
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    const date: DateTime = {
      date: new Date(currentDate),
    };

    dispatch(getMealTypes(date, headers));
  }, [dispatch]);

  return (
    <div className="w-[20vw] flex flex-col ">
      <div className="bg-white flex flex-row w-full h-[6vh] items-center justify-between">
        <div className="w-[14vw] ">
          <InputGroup width={{ md: "14vw" }}>
            <InputLeftElement
              pointerEvents="none"
              children={<CalendarIcon color="gray.300" />}
            />
            <Input
              type="date"
              placeholder="Enter date"
              value={date}
              onChange={getData}
            />
          </InputGroup>
        </div>

        {/* <Button colorScheme="teal" variant="outline" width={{ md: "6vw" }}>
          Add
        </Button> */}

        <Menu>
          <MenuButton
            color="teal"
            variant="outline"
            as={Button}
            rightIcon={<ChevronDownIcon />}
            //onClick={addNewMealType}
          >
            Add
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => addNewMealType(Type.BREAKFAST)}>
              Breakfast
            </MenuItem>
            <MenuItem onClick={() => addNewMealType(Type.LUNCH)}>
              Lunch
            </MenuItem>
            <MenuItem onClick={() => addNewMealType(Type.DINNER)}>
              Dinner
            </MenuItem>
            <MenuItem onClick={() => addNewMealType(Type.SNACK)}>
              Snack
            </MenuItem>
            <MenuItem onClick={() => addNewMealType(Type.FASTFOOD)}>
              Fastfood
            </MenuItem>
            <MenuItem onClick={() => addNewMealType(Type.WATER)}>
              Water
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className="flex w-full h-[100vh] flex-col overflow-auto ">
        {meals.length === 0 ? (
          <p>No data added</p>
        ) : (
          meals.map((value: AllMeals, index) => (
            value && <MealTypeItem meals={value.meal} hour={value.hour} id={value.id} type={value.type} selectIndex={props.selectIndex} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}   />
          ))
        )}
      </div>
    </div>
  );
};

export default DayTime;
