import type { Item as ItemType } from "../types/Items";
import { Item } from "./Item";
function EmptyList() {
  return <p className="text-gray-500 italic text-center py-4">アイテムがありません</p>;
}
function ItemListContent({ items }: { items: ItemType[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}
export function ItemList({ items }: { items: ItemType[] }) {
  return (
    <section className="border p-4 rounded mb-4">
      <h2 className="font-bold text-lg mb-2">Item List</h2>
      {items.length === 0 ? <EmptyList /> : <ItemListContent items={items} />}
    </section>
  );
}
