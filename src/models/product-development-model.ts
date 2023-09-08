export interface Ingredient {
  ingredientName: string;
  ingredientUnit: string;
  ingredientQuantity: string;
}
export interface FormFields {
  recipeName: string;
  ingredientList: Ingredient[];
  cookingProcess: string;
  video: string | ArrayBuffer | null;
  image: string | ArrayBuffer | null;
  equipmentList: string[];
  cookingTime: string;
  servingPerson: string;
}

