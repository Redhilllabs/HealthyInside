import React, { useState } from "react";
import { Button, Modal, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RecipeForm from "../recipe-form";
import { FormFields } from "@/models/product-development-model";

const TestRecipe = () => {
  const [opened, { open, close }] = useDisclosure(false);
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
  };

  const renderButton = (label: string) => (
    <div className="m-3">
      <Button
        color="blue"
        size="md"
        compact
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
      <Modal
        opened={opened}
        onClose={close}
        title="LIST"
        size="55%"
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        {modalContent.map((item, index) => (
          <div
            key={item}
            className="list bg-primary text-center m-1 text-white"
            onClick={() => renderPreviewRecipe(item)}
          >
            <p>{item}</p>
          </div>
        ))}
      </Modal>
      <div className="d-flex">
        {renderButton("New Recipes")}
        {renderButton("Tested Recipe")}
        {renderButton("In-Test Recipes")}
        {renderButton("Rejected Recipe")}
        {renderButton("Incomplete Data")}
      </div>
      <div className="container">
        {selectedRecipe && (
          <div>
            <button
              className="btn bg-primary text-white m-1"
              onClick={() => setEnableEdit(true)}
            >
              Edit
            </button>
            <RecipeForm loadFormData={recipe} edit={enableEdit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRecipe;
