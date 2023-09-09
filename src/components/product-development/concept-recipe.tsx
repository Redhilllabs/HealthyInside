import React, { useState } from "react";
import Swal from "sweetalert2";
import RecipeForm from "../recipe-form/recipe-form";
import { SaveConceptRecipe } from "@/services/save-concept-recipe-service";
import { FormFields } from "@/models/product-development-model";
import { Loader } from "@mantine/core";
const ConceptRecipe = () => {
  const initialRecipe = {
    recipeName: "",
    ingredientList: [],
    cookingProcess: "",
    video: null,
    image: null,
    cookingTime: "",
    equipmentList: [],
    servingPerson: "",
  };
  const [loading, setLoading] = useState(false);
  const SaveConceptData = async (data: FormFields) => {
    try {
      setLoading(true);

      const response = await SaveConceptRecipe(data);

      if (response) {
        Swal.fire("Recipe Saved Successfully!", "", "success");
      } else {
        console.error("API request failed with status:", response);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("", "Failed To Save", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12 border bg-white p-3 rounded">
      {loading ? (
        <Loader size="xl" variant="bars" />
      ) : (
        <RecipeForm
          loadFormData={initialRecipe}
          edit={true}
          onFormSubmit={(data) => {
            SaveConceptData(data);
          }}
        />
      )}
    </div>
  );
};

export default ConceptRecipe;
