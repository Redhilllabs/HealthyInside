import React from "react";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { IngredientItem } from "@/models/product-development-model";

interface ListItemsProps {
  title: string;
  items: (string | IngredientItem)[];
  isIngredients?: boolean;
}
const ListItems: React.FC<ListItemsProps> = ({
  title,
  items,
  isIngredients,
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
            <div key={index} className="p-1">
              <List.Item>
                <>
                  {isIngredients && typeof item !== "string"
                    ? `${item.ingredientName} ${item.ingredientQuantity} ${item.ingredientUnit}`
                    : item}
                </>
              </List.Item>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};
export default ListItems;
