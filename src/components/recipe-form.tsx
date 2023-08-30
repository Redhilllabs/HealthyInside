import React, { useState } from "react";
import { FormFields } from "@/models/product-development-model";
import { List, ThemeIcon, Divider } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
const RecipeForm = ({
  loadFormData,
  edit,
}: {
  loadFormData: FormFields;
  edit: boolean;
}) => {
  const [equipment, setEquipment] = useState("");
  const [ingredient, setIngredient] = useState({
    ingredientName: "",
    ingredientUnit: "",
    ingredientQuantity: "",
  });
  const [formFields, setFormFields] = useState<FormFields>(loadFormData);

  const handleAddIngredient = () => {
    if (
      !ingredient.ingredientName ||
      !ingredient.ingredientQuantity ||
      !ingredient.ingredientUnit
    ) {
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

  const handleAddEquipment = () => {
    if (!equipment) {
      return;
    }

    setFormFields({
      ...formFields,
      equipmentList: [...formFields.equipmentList, equipment],
    });
    setEquipment("");
  };

  return (
    <>
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Recipe Name<span className="text-danger">*</span>{" "}
          </label>
          <div className="col">
            <input
              type="text"
              value={formFields.recipeName}
              className="form-control"
              disabled={!edit}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="row p-0">
            <div className="col">
              <label className="form-label">
                Cooking Time <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="time"
                className="form-control"
                required
                disabled={!edit}
              />
            </div>

            <div className="col">
              <label className="form-label">
                Serving Person <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="number"
                className="form-control"
                required
                disabled={!edit}
              />
            </div>
          </div>
        </div>
        {edit && (
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
        )}
        <div className="mb-3">
          <label className="form-label">
            Cooking Process <span className="text-danger">*</span>{" "}
          </label>
          <div className="col">
            <textarea
              name=""
              className="form-control"
              id=""
              value={formFields.cookingProcess}
              required
              disabled={!edit}
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
            <input type="file" className="form-control" />
          </div>
        </div>
        {edit && (
          <div className="mb-3">
          <label className="form-label">Equipment Required</label>
          <div className="col">
            <input
              type="text"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="form-control"
              placeholder="Equipments"
            />
          </div>
          <button
            type="button"
            className="btn bg-primary text-white m-1"
            onClick={handleAddEquipment}
          >
            ADD
          </button>
        </div>
        )}
        
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
                {formFields.ingredientList?.map((item, index) => (
                  <div key={item.ingredientName} className="p-1">
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
                {formFields.equipmentList?.map((item, index) => (
                  <div key={item} className="p-1">
                    <List.Item> {item}</List.Item>
                  </div>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeForm;
