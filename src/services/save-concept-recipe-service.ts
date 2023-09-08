import { FormFields } from '@/models/product-development-model';


export const SaveConceptRecipe = async (data: FormFields) => {

  const response = await fetch("https://lmsmhn4kg8.execute-api.us-east-1.amazonaws.com/prod/product-development", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response
};
