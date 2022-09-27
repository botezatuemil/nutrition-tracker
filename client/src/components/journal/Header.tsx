import {
  Button,
  Divider,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon, ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import ModalMeal from "./ModalMeal";
import { AllMeals, Nutrients, RecipeShow } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteMeal, deleteMealbyId } from "../../actions/mealAction";
import { substract } from "../../store/mealTotal";
import {addMealTypeToRecipe} from "../../actions/recipeAction";

const Header: React.FC<{
  selectIndex: (id: number) => void;
  index: number;
  nutrients: string[] | undefined;
}> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const checkedMeals : string[] = useAppSelector(state => state.checkedMeals);
  const recipes : RecipeShow[] = useAppSelector(state => state.recipes);

  const deleteMeals = () => {
    
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    findNutrients();
    dispatch(deleteMeal(checkedMeals, headers));
    
  }

  const findNutrients = () => {
    checkedMeals.map(value => {
      const splittedMeals = value.split(/[(,)]/);
      console.log(splittedMeals);
        
      const newNutrients = props.nutrients?.map(valueNutrients => {
        const nutrientsSplitted = valueNutrients.split(/[(,)]/);
        console.log(nutrientsSplitted);
        
        if (nutrientsSplitted[1] === splittedMeals[3]) {
          const nutrients : Nutrients = {
            calories: parseInt(nutrientsSplitted[2]),
            protein :parseInt(nutrientsSplitted[3]),
            carbs: parseInt(nutrientsSplitted[4]),
            fat: parseInt(nutrientsSplitted[5]),
            sugar: parseInt(nutrientsSplitted[6]),
          }

          dispatch(substract(nutrients));
        }
      })
    })
  }

  const addRecipeToMeals = (value : RecipeShow) => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    dispatch(addMealTypeToRecipe(props.index, value, headers));
  }

  const deleteMealType = () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    dispatch(deleteMealbyId(props.index, headers));
  }

  return (
    <div className="flex flex-row w-full min-h-[8vh] items-center justify-center  ">
      <div className="flex space-x-[4vw] w-full  items-center justify-center">
        <div className="flex space-x-2">
          <Button
            variant="solid"
            backgroundColor="white"
            width="3vw"
            height="5vh"
            onClick={deleteMeals}
          >
            <RiDeleteBinLine />
          </Button>
          <Button
            variant="solid"
            backgroundColor="white"
            px="30px"
            width="8vw"
            height="5vh"
          >
            <p className="text-sm font-jakarta ">Save meal</p>
          </Button>

          <Button
            variant="solid"
            backgroundColor="white"
            px="30px"
            width="8vw"
            height="5vh"
          >
            <p className="text-sm font-jakarta ">Create Copy</p>
          </Button>
        </div>
        <div className="flex h-full space-x-1 bg-[#F4F5FC] items-center">
          <Menu>
            <MenuButton
              //backgroundColor="whiteAlpha"
              variant="ghost"
              px="10px"
              as={Button}
              leftIcon={<GiHotMeal />}
              rightIcon={<ChevronDownIcon />}
            >
              <p className="text-sm font-jakarta ">Saved meals</p>
            </MenuButton>
            <MenuList>
              {recipes.map(value => (
                <MenuItem onClick={() => addRecipeToMeals(value)}>{value.name}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <div className="h-[4vh] bg-[#E0E0E0] w-[2px] rounded" />
          <Menu>
            <MenuButton
              //backgroundColor="whiteAlpha"
              variant="ghost"
              px="10px"
              as={Button}
              leftIcon={<AiOutlineAppstore />}
              rightIcon={<ChevronDownIcon />}
            >
              <p className="text-sm font-jakarta ">Last added products</p>
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          <div className="h-[4vh] bg-[#E0E0E0] w-[2px] rounded" />
          <Menu>
            <MenuButton
              //backgroundColor="whiteAlpha"
              variant="ghost"
              as={Button}
            >
              <BiMenuAltLeft fontSize="25px" />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem onClick={deleteMealType}>Delete Meal Type</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          <button
            onClick={() => setShow(true)}
            className="bg-[#3E73F7] w-[2vw] h-[2vw] flex justify-center items-center rounded-sm shadow-md"
          >
            <AddIcon color="white" fontSize="12px" fontWeight="bold" />
          </button>

          {show && (
            <ModalMeal
             
              selectIndex={props.selectIndex}
              index={props.index}
              title="Add a New Meal"
              setShow={setShow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
