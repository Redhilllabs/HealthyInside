import React, { useState } from "react";
import { FormFields } from "@/models/product-development-model";
import {
  List,
  ThemeIcon,
  Divider,
  Alert,
  Box,
  Modal,
  Button,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { IconAlertCircle } from "@tabler/icons-react";
const ProductDevelopment = () => {
  const [ingredient, setIngredient] = useState({
    ingredientName: "",
    ingredientUnit: "",
    ingredientQuantity: "",
  });
  const [formFields, setFormFields] = useState<FormFields>({
    recipeName: "",
    ingredientList: [],
    cookingProcess: "",
    video: null,
    image: null,
    equipmentList: [],
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleAddIngredient = () => {
    if (
      !ingredient.ingredientName ||
      !ingredient.ingredientQuantity ||
      !ingredient.ingredientUnit
    ) {
      setShowAlert(true);
      return;
    }

    setFormFields({
      ...formFields,
      ingredientList: [...formFields.ingredientList, ingredient],
    });

    setIngredient({
      ingredientName: "",
      ingredientQuantity: "",
      ingredientUnit: "gm",
    });
  };
  const [equipment, setEquipment] = useState("");
  const handleAddEquipment = () => {
    console.log("Equipment added:", equipment);
if(!equipment){
  setShowAlert(true);
  return
}
    setFormFields({
      ...formFields,
      equipmentList: [...formFields.equipmentList, equipment],
    });
    setEquipment("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formFields);
  };
  return (
    <div className="col-md-12 border bg-white p-3 rounded">
      <form className="row mt-2" onSubmit={(e) => handleSubmit}>
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
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">
              Recipe Name<span className="text-danger">*</span>{" "}
            </label>
            <div className="col">
              <input type="text" className="form-control" required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Ingredient / Weight <span className="text-danger">*</span>{" "}
            </label>
            <div className="row p-0">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={ingredient.ingredientName}
                  onChange={(e) => {
                    setIngredient({
                      ...ingredient,
                      ingredientName: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="quantity"
                  value={ingredient.ingredientQuantity}
                  onChange={(e) => {
                    setIngredient({
                      ...ingredient,
                      ingredientQuantity: e.target.value,
                    });
                  }}
                  required
                />
              </div>

              <div className="col">
                <select
                  name=""
                  id=""
                  className="form-select"
                  placeholder="unit"
                  value={ingredient.ingredientUnit}
                  onChange={(e) =>
                    setIngredient({
                      ...ingredient,
                      ingredientUnit: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Unit</option>
                  <option value="gm">gm</option>
                  <option value="kg">kg</option>
                  <option value="mg">mg</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className="btn bg-primary text-white m-1"
              onClick={handleAddIngredient}
            >
              ADD
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Cooking Process <span className="text-danger">*</span>{" "}
            </label>
            <div className="col">
              <textarea
                name=""
                className="form-control"
                id=""
                required
              ></textarea>
            </div>
          </div>
          <Divider my="xs" label="Optional" labelPosition="center" />
          <div className="mb-3">
            <label className="form-label">Upload Video</label>
            <div className="col">
              <input type="file" className="form-control" />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <div className="col">
              <input type="file" className="form-control" required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Equipment Required </label>
            <div className="col">
              <input type="text" onChange={(e)=>setEquipment(e.target.value)} className="form-control" />
            </div>
            <button
              type="button"
              className="btn bg-primary text-white m-1"
              onClick={handleAddEquipment}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Ingredients List</label>
            <div className="col">
              <div className="border rounded p-3 d-flex">
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
                  {formFields.ingredientList &&
                    formFields.ingredientList?.map((item, index) => (
                      <div key={index} className="p-1">
                        <List.Item>
                          {" "}
                          {item.ingredientName} {item.ingredientQuantity}{" "}
                          {item.ingredientUnit}
                        </List.Item>
                      </div>
                    ))}
                </List>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Equipments List</label>
            <div className="col">
              <div className="border rounded p-3">
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
                  {formFields.equipmentList &&
                    formFields.equipmentList?.map((item, index) => (
                      <div key={index} className="p-1">
                        <List.Item> {item}</List.Item>
                      </div>
                    ))}
                </List>
              </div>
            </div>
          </div>
        </div>
        <div className="col text-center">
          <button className="btn btn-bg bg-primary text-white " type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDevelopment;
