export interface FormFields {
    recipeName: string;
    ingredientList: Array<{
      ingredientName: string;
      ingredientUnit: string;
      ingredientQuantity: string;
    }>;
    cookingProcess: string;
    video: File | null;
    image: File | null;
    equipmentList: string[];
  }