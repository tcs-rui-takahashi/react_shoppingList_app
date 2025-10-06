import { Item } from './Item';

export function ItemList() {
  return (
    <section className="border p-4 rounded mb-4">
      <h2 className="font-bold text-lg mb-2">Item List</h2>
      {/* TODO: アイテムのリストを動的に生成する */}
      <Item />
      <Item />
      <Item />
    </section>
  );
}