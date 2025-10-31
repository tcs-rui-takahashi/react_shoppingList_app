import type { Item as ItemType } from "../types/Items";

type ItemProps = {
  item: ItemType;
};

export function Item({ item }: ItemProps) {
  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <div>
        <span className="font-medium">{item.name}</span>
        {item.quantity !== undefined && item.quantity > 0 && item.unit && (
          <span className="ml-1 text-sm text-gray-600">
            ({item.quantity} {item.unit})
          </span>
        )}
        {item.note && <p className="text-xs text-gray-500">{item.note}</p>}
      </div>
    </li>
  );
}