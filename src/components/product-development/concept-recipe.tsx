import React, { useState } from "react";
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
  const [showAlert, setShowAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="col-md-12 border bg-white p-3 rounded">
      <form className="row mt-2" onSubmit={(e) => handleSubmit(e)}>
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
        <Modal
          size="sm"
          padding="md"
          opened={showAlert}
          onClose={() => setShowAlert(false)}
        >
          <div style={{ textAlign: "center" }}>
            <IconAlertCircle size="1.5rem" color="red" />
            <p>Please Fill All Required Fields!</p>
          </div>
        </Modal>
        <RecipeForm loadFormData={initialRecipe} edit={true} />
        <div className="col text-center">
          <button className="btn btn-bg bg-primary text-white " type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConceptRecipe;
