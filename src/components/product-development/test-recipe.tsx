import React, { useState } from "react";
import { Button, List, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RecipeForm from "../recipe-form/recipe-form";
import { FormFields } from "@/models/product-development-model";
import { getProductListByStatus } from "@/services/get-recipe-by-status";
import { StatusList } from "../Common-component/recipe-status-list";
import { UpdateRecipeByStatus } from "@/services/update-recipe-by-status-service";
import Swal from "sweetalert2";

const TestRecipe = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [recipeList, setRecipeList] = useState<FormFields[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<FormFields | null>(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("inTest");
  const [displayBackButton, setDisplayBackButton] = useState(false);

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };
  const OpenRecipesList = async (value: string) => {
    setLoading(true);
    setDisplayBackButton(true);
    setSelectedOption("inTest");
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

  const goBackToButton = () => {
    setSelectedRecipe(null);
    setButtonsVisible(true);
    close();
    setDisplayBackButton(false);
  };
  const options = [
    {
      id: "inTest",
      label: "In-test",
    },
    {
      id: "rejected",
      label: "Rejected",
    },
    {
      id: "incomplete",
      label: "Incomplete data",
    },
    {
      id: "doNothing",
      label: "Do nothing",
    },
  ];

  const UpdateRecipe = async () => {
    const data = {
      id: selectedRecipe?.productid,
      newStatus: selectedOption,
    };
    const response = await UpdateRecipeByStatus(data);
    Swal.fire("Updated Successfully", "", "success");
    const recipeList = await getProductListByStatus("NewRecipe");
    setRecipeList(recipeList);
    goBackToList();
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
                Back
              </button>
            </div>
            <RecipeForm
              loadFormData={selectedRecipe}
              edit={enableEdit}
              onFormSubmit={(data) => setSelectedRecipe(data)}
            />
            <div className="d-flex flex-column text-center">
              <label htmlFor="" className="form-control">
                Select Options
              </label>
              <div
                className="btn-group m-3 text-center"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                {options.map((option) => (
                  <div key={option.id} className="m-3">
                    <input
                      type="radio"
                      className="btn-check m-3"
                      name="selectedOption"
                      id={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => handleOptionChange(option.id)}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={option.id}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="button">
              <button
                type="submit"
                className="btn bg-primary text-white"
                onClick={() => UpdateRecipe()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            {displayBackButton && (
              <button
                className="btn bg-primary text-white m-1"
                onClick={goBackToButton}
              >
                Back
              </button>
            )}
          </div>
          <List spacing="xs" size="sm" center type="ordered">
            {opened &&
              recipeList.map((item) => (
                <List.Item
                  key={item.recipeName}
                  onClick={() => renderPreviewRecipe(item)}
                >
                  {item?.recipeName}
                </List.Item>
              ))}
          </List>
        </>
      )}
    </div>
  );
};

export default TestRecipe;
