import React, { FormEvent, useState } from "react";
import { FormFields } from "@/models/product-development-model";
import { Divider } from "@mantine/core";
import ListItems from "../Common-component/list-items";
import InputField from "../Common-component/input-field";
const RecipeForm = ({
  loadFormData,
  edit,
  onFormSubmit,
}: {
  loadFormData: FormFields;
  edit: boolean;
  onFormSubmit: (data: FormFields) => void;
}) => {
  const [equipment, setEquipment] = useState("");
  const [ingredient, setIngredient] = useState({
    ingredientName: "",
    ingredientUnit: "",
    ingredientQuantity: "",
  });
  const [formFields, setFormFields] = useState<FormFields>(loadFormData);
  const [errorField, setError] = useState(false);

  const handleAddIngredient = () => {
    if (
      !ingredient.ingredientName.trim() ||
      !ingredient.ingredientQuantity.trim() ||
      !ingredient.ingredientUnit.trim()
    ) {
      setError(true);
      return;
    }
    setError(false);
    setFormFields({
      ...formFields,
      ingredientList: [...formFields.ingredientList, ingredient],
    });

    setIngredient({
      ingredientName: "",
      ingredientQuantity: "",
      ingredientUnit: "",
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
  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event?.target?.result ?? "";
        setFormFields({
          ...formFields,
          image: base64String,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.ingredientList || formFields.ingredientList.length === 0) {
      setError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setError(false);
    onFormSubmit(formFields);
    setFormFields(loadFormData);
  };


  return (
    <>
      <form className="row mt-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-md-6">
          <InputField
            type="text"
            label="Recipe Name"
            value={formFields.recipeName}
            onChange={(e) =>
              setFormFields({
                ...formFields,
                recipeName: e.target.value,
              })
            }
            disabled={edit}
          />
          <div className="mb-3">
            <div className="row p-0">
              <div className="col">
                <InputField
                  type="time"
                  label="Cooking Time"
                  value={formFields.cookingTime}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      cookingTime: e.target.value,
                    })
                  }
                  disabled={edit}
                />
              </div>

              <div className="col">
                <InputField
                  type="number"
                  label="Serving Person"
                  value={formFields.servingPerson}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      servingPerson: e.target.value,
                    })
                  }
                  disabled={edit}
                />
              </div>
            </div>
          </div>
          {edit && (
            <div className="mb-3">
              <label className="form-label">
                Ingredient / Weight{" "}
                <span className="text-danger">
                  {errorField ? "Fill Ingredients !" : "*"}
                </span>
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
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="quantity"
                    value={ingredient.ingredientQuantity}
                    onChange={(e) => {
                      setIngredient({
                        ...ingredient,
                        ingredientQuantity: e.target.value,
                      });
                    }}
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
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    cookingProcess: e.target.value,
                  })
                }
                disabled={!edit}
              ></textarea>
            </div>
          </div>
          <Divider my="xs" label="Optional" labelPosition="center" />
          {/* <div className="mb-3">
            <InputField
              type="file"
              label="Upload Video"
              accept="video/*"
              onChange={(e) => handleVideoUpload(e)}
              disabled={edit}
            />
          </div> */}
          <div className="mb-3">
            <InputField
              type="file"
              label="Upload Image"
              accept="image/*"
              onChange={handleImageChange}
              disabled={edit}
              requiredField = {false}
            />
            {formFields.image && (
              <div className="mt-3">
                <img
                  src={formFields.image as string}
                  alt="Uploaded"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
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
            <ListItems
              title="Ingredients List"
              items={formFields.ingredientList || []}
              isIngredients
            />
          </div>
          <div className="mb-3">
            <ListItems
              title="Equipments List"
              items={formFields.equipmentList || []}
            />
          </div>
        </div>
        <div className="col text-center">
          <button className="btn btn-bg bg-primary text-white " type="submit">
            {edit ? "Submit" : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
