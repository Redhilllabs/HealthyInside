import React, { useState, useEffect } from "react";
import { Button, List, ThemeIcon, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RecipeForm from "../recipe-form/recipe-form";
import { FormFields } from "@/models/product-development-model";
import { getProductListByStatus } from "@/services/get-recipe-by-status";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { StatusList } from "../Common-component/recipe-status-list";

const TestRecipe = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [recipeList, setRecipeList] = useState<FormFields[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<FormFields | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  const OpenRecipesList = async (value: string) => {
    setLoading(true); 
    try {
      const recipeList = await getProductListByStatus(value);
      setRecipeList(recipeList);
      open();
      setButtonsVisible(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  const renderButton = (category: any) => (
    <Button
      key={category.value}
      color="indigo"
      radius="xs"
      size="xl"
      uppercase
      className={`m-3 ${buttonsVisible ? "" : "d-none"}`}
      onClick={() => OpenRecipesList(category.value)}
      disabled={!buttonsVisible}
    >
      {category.label}
    </Button>
  );

  const renderPreviewRecipe = (item: FormFields) => {
    setSelectedRecipe(item);
    setEnableEdit(false);
    close();
  };

  const goBackToList = () => {
    setSelectedRecipe(null);
    open();
  };

  return (
    <div className="container text-center p-5 bg-white">
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap">
          {Object.values(StatusList.categories).map((category) =>
            renderButton(category)
          )}
        </div>
      </div>
      {loading ? ( 
        <Loader />
      ) : selectedRecipe ? (
        <div className="col-md-12 border bg-white p-3 rounded">
          <div className="row mt-2">
            <div className="d-flex justify-content-between">
              <button
                className="btn bg-primary text-white m-1"
                onClick={goBackToList}
              >
                Back to List
              </button>
              <button
                className="btn bg-primary text-white m-1"
                onClick={() => setEnableEdit(true)}
              >
                Edit
              </button>
            </div>

            <RecipeForm
              loadFormData={selectedRecipe}
              edit={enableEdit}
              onFormSubmit={(data) => setSelectedRecipe(data)}
            />
          </div>
        </div>
      ) : (
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          {opened &&
            recipeList.map((item, index) => (
              <List.Item key={index} onClick={() => renderPreviewRecipe(item)}>
                {item?.recipeName}
              </List.Item>
            ))}
        </List>
      )}
    </div>
  );
};

export default TestRecipe;
