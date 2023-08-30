export interface Ingredient {
  ingredientName: string;
  ingredientUnit: string;
  ingredientQuantity: string;
}
export interface FormFields {
  recipeName: string;
  ingredientList: Ingredient[];
  cookingProcess: string;
  video: File | null;
  image: File | null;
  equipmentList: string[];
  cookingTime: string;
  servingPerson: string;
}
