import React, { useState, useEffect } from "react";
import Navbar from "../nav/Navbar";
import { Button, ButtonGroup } from "@chakra-ui/react";
import TableFunctions from "./TableFunctions";
import { MealTable } from "../../interfaces";
import RecipeType from "./RecipeType";
import ModalRecipe from "./ModalRecipe";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllRecipes } from "../../actions/recipeAction";

const Recipes = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    console.log(headers);

    //if (recipes.length === 0) {
      dispatch(getAllRecipes(headers));
    //}
  }, [dispatch]);

  return (
    <div className="flex w-[80vw] flex-col h-[100vh] overflow-hidden bg-[#F8F8F8]">
      <Navbar title="Recipes" />
      <div className="flex flex-col h-full w-full p-10 ">
        <Button
          variant="solid"
          backgroundColor="#4075F8"
          color="white"
          width="7vw"
          height="35px"
          onClick={() => setShowModal(true)}
        >
          <p className="font-jakarta text-sm">Add recipe</p>
        </Button>
        <TableFunctions recipes={recipes} />
        <div className="flex space-y-2 flex-col overflow-auto h-[75vh]">
          {recipes.map((value) => (
            <RecipeType
              id={value.id}
              name={value.name}
              amount={value.amount}
              carbs={value.carbs}
              fat={value.fat}
              kcal={value.calories}
              protein={value.protein}
              sugar={value.sugar}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <ModalRecipe title="Add a New Recipe" setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Recipes;
