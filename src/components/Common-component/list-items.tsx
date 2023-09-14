import React from "react";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconTrash } from "@tabler/icons-react";
import { IngredientItem } from "@/models/product-development-model";

interface ListItemsProps {
  title: string;
  items: (string | IngredientItem)[];
  isIngredients?: boolean;
  removeItem : (index:number)=> void;
}
const ListItems: React.FC<ListItemsProps> = ({
  title,
  items,
  isIngredients,
  removeItem,
}) => {
  return (
    <div>
      <label className="form-label">{title}</label>
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
          {items.map((item, index) => (
            <div key={index + 1} className=" d-flex justify-content-between p-1">
              <List.Item>
                <>
                  {isIngredients && typeof item !== "string"
                    ? `${item.ingredientName} ${item.ingredientQuantity} ${item.ingredientUnit}`
                    : item}
                </>
              </List.Item>
              <div className="deleteButton ms-1" onClick={()=>removeItem(index)}>
                <IconTrash size="1rem"/>
              </div>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};
export default ListItems;
