export interface IngredientItem {
  ingredientName: string;
  ingredientUnit: string;
  ingredientQuantity: string;
}
export interface FormFields {
  recipeName: string;
  ingredientList: IngredientItem[];
  cookingProcess: string;
  video: string | ArrayBuffer | null;
  image: string | ArrayBuffer | null;
  equipmentList: string[];
  cookingTime: string;
  servingPerson: string;
  productid:number
}

