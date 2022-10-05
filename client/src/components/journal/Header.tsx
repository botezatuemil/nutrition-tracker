import {
  Button,
  Divider,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon, ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import ModalMeal from "./ModalMeal";
import {
  AllMeals,
  Meal,
  Nutrients,
  NutrientsRef,
  RecipeShow,
} from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteMeal,
  deleteMealbyId,
  createCopy,
  addMealJournal,
  getLastProducts
} from "../../actions/mealAction";
import { add, substract } from "../../store/mealTotal";
import {
  addMealTypeToRecipe,
  addMealToRecipe,
} from "../../actions/recipeAction";
import meal, { updateMeals } from "../../store/meal";
import { fetch } from "../../store/lastProducts";

const Header: React.FC<{
  selectIndex: (id: number) => void;
  index: number;
  nutrients: string[] | undefined;
}> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const checkedMeals: string[] = useAppSelector((state) => state.checkedMeals);
  const recipes: RecipeShow[] = useAppSelector((state) => state.recipes);
  const lastProducts: AllMeals[] = useAppSelector(
    (state) => state.lastProducts
  );

  const { isOpen, onOpen} = useDisclosure()
  const cancelRef = React.useRef(null);
  const toast = useToast();

  const deleteMeals = () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    sustractNutrients();
    dispatch(deleteMeal(checkedMeals, headers));
  };

  const findNutrients = (): Nutrients[] => {
    const nutrients: Nutrients[] = [];

    checkedMeals.map((value) => {
      const splittedMeals = value.split(/[(,)]/);

      const newNutrients = props.nutrients?.map((valueNutrients) => {
        const nutrientsSplitted = valueNutrients.split(/[(,)]/);

        if (nutrientsSplitted[1] === splittedMeals[3]) {
          const nutrient: Nutrients = {
            calories: parseInt(nutrientsSplitted[2]),
            protein: parseInt(nutrientsSplitted[3]),
            carbs: parseInt(nutrientsSplitted[4]),
            fat: parseInt(nutrientsSplitted[5]),
            sugar: parseInt(nutrientsSplitted[6]),
          };
          nutrients.push(nutrient);
        }
      });
    });
    return nutrients;
  };

  const sustractNutrients = () => {
    const nutrients: Nutrients[] = findNutrients();

    nutrients.map((value) => {
      dispatch(substract(value));
    });
  };

  const addRecipeToMeals = (value: RecipeShow) => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    dispatch(addMealTypeToRecipe(props.index, value, headers));
  };

  const deleteMealType = () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    dispatch(deleteMealbyId(props.index, headers));
    setShowDelete(false);
  };

  const saveToRecipe = () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    dispatch(addMealToRecipe(checkedMeals, headers));
  };

  const onCopy = () => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    const nutrients: Nutrients[] = findNutrients();

    checkedMeals.map((meal, idx) => {
      const splittedMeal = meal.split(/[(,)]/);
      console.log(splittedMeal);

      const newMeal: Meal = {
        name: splittedMeal[2],
        amount: splittedMeal[4],
        nutrient_id: parseInt(splittedMeal[3]),
        meal_type_id: parseInt(splittedMeal[5]),
      };
      const nutrient: NutrientsRef = {
        calories: nutrients[idx].calories.toString(),
        carbs: nutrients[idx].carbs.toString(),
        fat: nutrients[idx].fat.toString(),
        protein: nutrients[idx].protein.toString(),
        sugar: nutrients[idx].sugar.toString(),
      };
      const addToLast : boolean = true;
      dispatch(addMealJournal(newMeal, nutrient, headers, addToLast));
      dispatch(add(nutrients[idx]));
    });
  };

  const onAddedProduct = (value : AllMeals) => {
    const splittedMeals = value.meal.split(/[(,)]/);
    const splittedNutrients = value.nutrients.split(/[(,)]/);

    const meal : Meal = {
      name: splittedMeals[2],
      amount: splittedMeals[4],
      nutrient_id: parseInt(splittedMeals[3]),
      meal_type_id: props.index,
    }

    const nutrient: NutrientsRef = {
      calories: splittedNutrients[2],
      carbs: splittedNutrients[3],
      fat: splittedNutrients[4],
      protein: splittedNutrients[5],
      sugar:splittedNutrients[6],
    };

    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    const addToLast : boolean = false;
    dispatch(addMealJournal(meal, nutrient, headers, addToLast));
    dispatch(add(nutrient));
  }

  const onClose = () => {
    setShowDelete(false);
  }

  const onOpenModal = () => {
    setShowDelete(true);
  }

  useEffect(() => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };
    dispatch(getLastProducts(headers));
    
  }, [props.index])
  

  return (
    <div className="flex flex-row  w-[55vw] min-h-[8vh] items-center   ">
      <div className="flex  w-full  items-center  justify-between">
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
            <p className="text-sm font-jakarta " onClick={saveToRecipe}>
              Save meal
            </p>
          </Button>

          <Button
            variant="solid"
            backgroundColor="white"
            px="30px"
            width="8vw"
            height="5vh"
          >
            <p className="text-sm font-jakarta " onClick={onCopy}>
              Create Copy
            </p>
          </Button>
        </div>
        <div className="flex h-full space-x-1 bg-[#F4F5FC] items-center">
          <Menu>
            <MenuButton
              variant="ghost"
              px="10px"
              as={Button}
              leftIcon={<GiHotMeal />}
              rightIcon={<ChevronDownIcon />}
            >
              <p className="text-sm font-jakarta ">Saved meals</p>
            </MenuButton>
            <MenuList>
              {recipes.length !== 0 ? (
                recipes.map((value) => (
                  <MenuItem onClick={() => addRecipeToMeals(value)}>
                    {value.name}
                  </MenuItem>
                ))
              ) : (
                <p className="font-jakarta text-center">No recipes found!</p>
              )}
            </MenuList>
          </Menu>
          <div className="h-[4vh] bg-[#E0E0E0] w-[2px] rounded" />
          <Menu>
            <MenuButton
              variant="ghost"
              px="10px"
              as={Button}
              leftIcon={<AiOutlineAppstore />}
              rightIcon={<ChevronDownIcon />}
            >
              <p className="text-sm font-jakarta">Last added products</p>
            </MenuButton>
            <MenuList>
              {lastProducts.length !== 0 && lastProducts.map((value) => {
                const splitted: string[] = value.meal.split(/[(,)]/);
                return <MenuItem onClick={() => onAddedProduct(value)}>{splitted[2]}</MenuItem>;
              })}
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
              <MenuItem onClick={onOpenModal}>Delete category</MenuItem>
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

      <AlertDialog
        isOpen={showDelete}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
       
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              <p className="font-jakarta font-semibold">Delete Category</p>
            </AlertDialogHeader>

          
            <AlertDialogBody>
             <p className="font-jakarta">Are you sure? You can't undo this action afterwards.</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} >
                <p className="font-jakarta">Cancel</p>
              </Button>
              <Button colorScheme='red' onClick={deleteMealType} ml={3}>
                <p className="font-jakarta">Delete</p>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default Header;
