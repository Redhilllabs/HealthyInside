import React, { FormEvent, useState } from "react";
import { FormFields } from "@/models/product-development-model";
import { List, ThemeIcon, Divider } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Image from "next/image";
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

  
  // const handleVideoUpload = (e: any) => {
  //   const selectedFile = e.target.files && e.target.files[0];

  //   if (selectedFile) {
  //     const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  //     if (allowedVideoTypes.includes(selectedFile.type)) {
  //       const reader = new FileReader();

  //       reader.onload = (e) => {
  //         const base64Video = e?.target?.result || '';
  //         setFormFields({
  //           ...formFields,
  //           video: base64Video,
  //         });
  //       };

  //       reader.onerror = (error) => {
  //         console.error('Error reading file:', error);
  //       };

  //       reader.readAsDataURL(selectedFile);
  //     } else {
  //       // Handle the case where the selected file is not a valid video
  //       alert('Please select a valid video file (MP4, WebM, or OGG)');
  //     }
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.ingredientList || formFields.ingredientList.length === 0) {
      setError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setError(false);
    onFormSubmit(formFields);
    // setFormFields(loadFormData);
  };
  return (
    <>
      <form className="row mt-2" onSubmit={(e) => handleSubmit(e)}>
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
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    recipeName: e.target.value,
                  })
                }
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
                  value={formFields.cookingTime}
                  disabled={!edit}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      cookingTime: e.target.value,
                    })
                  }
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
                  value={formFields.servingPerson}
                  disabled={!edit}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      servingPerson: e.target.value,
                    })
                  }
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
          <div className="mb-3">
            <label className="form-label">Upload Video</label>
            <div className="col">
              <input
                type="file"
                accept="video/*"
                // onChange={(e) => handleVideoUpload(e)}
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <div className="col">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
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
