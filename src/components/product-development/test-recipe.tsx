import React, { useState } from "react";
import { Button, Modal, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RecipeForm from "../recipe-form/recipe-form";
import { FormFields } from "@/models/product-development-model";

const TestRecipe = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [hidebutton, setbuttonfalse] = useState(true);
  const [modalContent, setModalContent] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const OpenRecipesList = (value: string) => {
    setModalContent([
      "Recipe1",
      "Recipe2",
      "Recipe3",
      "Recipe4",
      "Recipe5",
      "Recipe6",
    ]);
    open();
    setbuttonfalse(false);
  };

  const renderButton = (label: string) => (
    <div className="m-3">
      <Button
        color="indigo"
        radius="xs"
        size="xl"
        uppercase
        onClick={() => OpenRecipesList(label)}
      >
        {label}
      </Button>
    </div>
  );
  const [recipe, setRecipe] = useState<FormFields>({
    recipeName: "",
    ingredientList: [],
    cookingProcess: "",
    video: null,
    image: null,
    cookingTime: "",
    equipmentList: [],
    servingPerson: "",
  });
  const renderPreviewRecipe = (item: string) => {
    setSelectedRecipe(item);
    setRecipe({
      recipeName: "RecipeName",
      ingredientList: [
        {
          ingredientName: "IngredientName",
          ingredientUnit: "10",
          ingredientQuantity: "gm",
        },
      ],
      cookingProcess: "this is the cooking process",
      video: null,
      image: null,
      cookingTime: "",
      equipmentList: [],
      servingPerson: "",
    });
    setEnableEdit(false);
    close();
  };

  return (
    <div className="container">
      {hidebutton && (
        <div className="container p-5 text-center bg-white">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap">
              {renderButton("New Recipes")}
              {renderButton("Tested Recipe")}
              {renderButton("In-Test Recipes")}
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap">
              {renderButton("Rejected Recipe")}
              {renderButton("Incomplete Data")}
            </div>
          </div>
        </div>
      )}

      <div>
        {opened &&
          modalContent.map((item, index) => (
            <div
              key={item}
              className="list bg-primary text-center m-1 text-white"
              onClick={() => renderPreviewRecipe(item)}
            >
              <p>{item}</p>
            </div>
          ))}
      </div>

      <div className="col-md-12 border bg-white p-3 rounded">
        {selectedRecipe && (
          <div className="row mt-2">
            <div className="d-flex justify-content-between">
              <button
                className="btn bg-primary text-white m-1"
                onClick={() => setEnableEdit(true)}
              >
                Edit
              </button>
              <button className="btn bg-primary text-white m-1">Skip</button>
            </div>

            <RecipeForm
              loadFormData={recipe}
              edit={enableEdit}
              onFormSubmit={(data) => setRecipe(data)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRecipe;
