import type { Item as ItemType } from "../types/Items";
import { Item } from "./Item";

type ItemListProps = {
  items: ItemType[];
};

// TODO:itemsは1－3で実装予定
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ItemList({ items: _items }: ItemListProps) {
  return (
    <section className="border p-4 rounded mb-4">
      <h2 className="font-bold text-lg mb-2">Shopping Items</h2>
      {/* TODO: アイテムのリストを動的に生成する */}
      <Item />
      <Item />
      <Item />
    </section>
  );
}
