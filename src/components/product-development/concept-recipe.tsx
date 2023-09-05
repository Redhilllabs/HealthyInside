import React, { useEffect, useState } from "react";
import { Modal, Notification, Transition } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import RecipeForm from "../recipe-form";

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

  const SaveConceptData = async (data: any) => {
    console.log("data", data);
// apiurl = "https://lmsmhn4kg8.execute-api.us-east-1.amazonaws.com/prod"
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
