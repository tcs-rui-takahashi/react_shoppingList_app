import { render, screen } from "@testing-library/react";
import { ItemList } from "../../apps/components/ItemList";
import type { Item as ItemType } from "../../apps/types/Items";

const mockItems: ItemType[] = [
  { id: "1", name: "りんご", quantity: 2, unit: "個", note: "赤い", completed: false },
  { id: "2", name: "バナナ", completed: true }, 
  { id: "3", name: "みかん", quantity: 0, completed: false }, 
  { id: "4", name: "ぶどう", unit: "房", completed: false }, 
  { id: "5", name: "スイカ", note: "大きい", completed: false } 
];

const renderItemList = (items: ItemType[] = mockItems) =>
  render(<ItemList items={items} />);

const expectTextsToBeInDocument = (texts: string[]) => {
  texts.forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
};

describe("ItemList", () => {
  test("見出しが表示される", () => {
    const items: ItemType[] = [];

    renderItemList(items);

    expect(screen.getByRole("heading", { name: /item list/i })).toBeInTheDocument();
  });

  test("アイテムがある場合はリストを表示する", () => {
    const items = mockItems;

    renderItemList(items);

    expectTextsToBeInDocument(["りんご", "バナナ", "みかん", "ぶどう", "スイカ"]);
    expectTextsToBeInDocument(["(2 個)"]);
    expectTextsToBeInDocument(["赤い", "大きい"]);
    expect(screen.queryByText("アイテムがありません")).toBeNull();
  });

  test("アイテムがない場合は「アイテムがありません」と表示される", () => {
    const items: ItemType[] = [];

    renderItemList(items);

    expect(screen.getByText("アイテムがありません")).toBeInTheDocument();
  });
});