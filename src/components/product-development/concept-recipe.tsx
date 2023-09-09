import React, { useEffect, useState } from "react";
import { Modal, Notification, Transition } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import RecipeForm from "../recipe-form/recipe-form";
import { SaveConceptRecipe } from "@/services/save-concept-recipe-service";
import { FormFields } from "@/models/product-development-model";

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
  const [showNotification, setShowNotification] = useState(false);

  const SaveConceptData = async (data: FormFields) => {
    try {
      const response = await SaveConceptRecipe(data);
      if (response) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.error("API request failed with status:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="col-md-12 border bg-white p-3 rounded">
      {showNotification && (
        <Transition
          mounted={showNotification}
          transition="slide-right"
          duration={100}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              {" "}
              <Notification
                icon={<IconCheck size="1.1rem" />}
                onClose={() => setShowNotification(false)}
                color="teal"
                title="Success"
              >
                Your Concept is Saved
              </Notification>
            </div>
          )}
        </Transition>
      )}
      <RecipeForm
        loadFormData={initialRecipe}
        edit={true}
        onFormSubmit={(data) => {
          SaveConceptData(data);
        }}
      />
    </div>
  );
};

export default ConceptRecipe;
